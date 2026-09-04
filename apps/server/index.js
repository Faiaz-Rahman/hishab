require('dotenv').config();

const express = require('express');
const admin = require('firebase-admin');
const {google} = require('googleapis');

const PORT = process.env.PORT || 3000;

if (!process.env.GOOGLE_SHEETS_ID) {
  console.warn('GOOGLE_SHEETS_ID is not set. Sheets endpoints will fail until it is configured.');
}

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    projectId: process.env.PROJECT_ID,
  }),
});

const app = express();
app.use(express.json());

const sheetsAuth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({version: 'v4', auth: sheetsAuth});
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({message: 'Missing or invalid authorization header'});
    }
    const token = authHeader.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Invalid or expired token'});
  }
};

const getMemberName = async (uid) => {
  const snapshot = await admin.firestore().collection('users').doc(uid).get();
  if (!snapshot.exists) {
    return null;
  }
  const data = snapshot.data();
  return data?.name || data?.memberName || null;
};

const ensureRowCount = (matrix, rowCount, colCount) => {
  while (matrix.length < rowCount) {
    matrix.push(new Array(colCount).fill(''));
  }
  return matrix;
};

app.post('/sendNotification', async (req, res) => {
  var fcmToken;
  const {name, email} = req.body;
  console.log('from request body =>', name, email);

  const snapshot = await admin
    .firestore()
    .collection('users')
    .doc(process.env.RECEIVER_UID)
    .get();

  if (snapshot.exists) {
    const data = snapshot.data();
    console.log('the snapshot data =>', data);

    fcmToken = data?.fcm;

    await admin.messaging().sendEachForMulticast({
      tokens: [fcmToken],
      data: {
        notifee: JSON.stringify({
          title: '7B',
          body: `A new expense has been added by ${name ? name : email}!`,
          android: {
            channelId: 'default',
            actions: [
              {
                title: 'Mark as Read',
                pressAction: {
                  id: 'read',
                },
              },
            ],
          },
        }),
      },
    });

    res.status(200).json({
      message: 'notification sent!',
    });
  }
});

app.post('/syncMeals', verifyFirebaseToken, async (req, res) => {
  try {
    const {selections} = req.body;
    const memberName = await getMemberName(req.user.uid);
    if (!memberName) {
      return res.status(400).json({message: 'Member name not found in profile. Please complete your profile.'});
    }
    if (!Array.isArray(selections) || selections.length === 0) {
      return res.status(400).json({message: 'No meal selections provided'});
    }

    const sheet = await sheets.spreadsheets.get({spreadsheetId: SPREADSHEET_ID});
    const sheetTitle = sheet.data.sheets[0]?.properties?.title;
    if (!sheetTitle) {
      return res.status(500).json({message: 'Unable to read sheet title'});
    }

    const matrixRange = `${sheetTitle}!A1:H33`;
    const matrixRes = await sheets.spreadsheets.values.get({spreadsheetId: SPREADSHEET_ID, range: matrixRange});
    const matrix = matrixRes.data.values || [];
    ensureRowCount(matrix, 33, 8);

    const header = matrix[0] || [];
    const memberColIndex = header.findIndex((h) => String(h).toLowerCase() === String(memberName).toLowerCase());
    if (memberColIndex === -1) {
      return res.status(400).json({message: `Member "${memberName}" not found in meal matrix header`});
    }

    let updatedCells = 0;
    for (const sel of selections) {
      const dayNum = new Date(sel.date).getDate();
      if (dayNum < 1 || dayNum > 31) {
        continue;
      }

      const rowIdx = dayNum;
      if (rowIdx < 2 || rowIdx > 32) {
        continue;
      }

      const currentVal = parseInt(matrix[rowIdx][memberColIndex] || '0', 10) || 0;
      const increment = (sel.lunch ? 1 : 0) + (sel.dinner ? 1 : 0);
      matrix[rowIdx][memberColIndex] = String(currentVal + increment);
      updatedCells++;
    }

    for (let col = 1; col <= 7; col++) {
      let sum = 0;
      for (let row = 2; row <= 32; row++) {
        const val = parseInt(matrix[row]?.[col] || '0', 10) || 0;
        sum += val;
      }
      matrix[33][col] = String(sum);
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: matrixRange,
      valueInputOption: 'RAW',
      requestBody: {values: matrix},
    });

    res.status(200).json({success: true, updatedCells});
  } catch (error) {
    console.error('syncMeals error', error);
    res.status(500).json({message: 'Failed to sync meals', error: error.message});
  }
});

app.post('/syncExpense', verifyFirebaseToken, async (req, res) => {
  try {
    const {itemName, qty, price, date} = req.body;
    const memberName = await getMemberName(req.user.uid);
    if (!memberName) {
      return res.status(400).json({message: 'Member name not found in profile. Please complete your profile.'});
    }

    const sheet = await sheets.spreadsheets.get({spreadsheetId: SPREADSHEET_ID});
    const sheetTitle = sheet.data.sheets[0]?.properties?.title;
    if (!sheetTitle) {
      return res.status(500).json({message: 'Unable to read sheet title'});
    }

    const bazarRange = `${sheetTitle}!J2:Q50`;
    const bazarRes = await sheets.spreadsheets.values.get({spreadsheetId: SPREADSHEET_ID, range: bazarRange});
    const bazarRows = bazarRes.data.values || [];

    const headerRow = bazarRows[0] || [];
    const memberColIndex = headerRow.findIndex((h) => String(h).toLowerCase() === String(memberName).toLowerCase());
    if (memberColIndex === -1) {
      return res.status(400).json({message: `Member "${memberName}" not found in bazar section header`});
    }

    const nextRow = bazarRows.length + 2;
    const targetRange = `${sheetTitle}!J${nextRow}:Q${nextRow}`;

    const newRow = new Array(8).fill('');
    newRow[0] = date || new Date().toISOString().split('T')[0];
    newRow[1] = itemName || '';
    newRow[2] = String(qty || '');
    newRow[3] = String(Number(price).toFixed(2));
    newRow[memberColIndex] = String(Number(price).toFixed(2));

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: targetRange,
      valueInputOption: 'RAW',
      requestBody: {values: [newRow]},
    });

    res.status(200).json({success: true, row: nextRow});
  } catch (error) {
    console.error('syncExpense error', error);
    res.status(500).json({message: 'Failed to sync expense', error: error.message});
  }
});

app.get('/getLedger', verifyFirebaseToken, async (req, res) => {
  try {
    const sheet = await sheets.spreadsheets.get({spreadsheetId: SPREADSHEET_ID});
    const sheetTitle = sheet.data.sheets[0]?.properties?.title;
    if (!sheetTitle) {
      return res.status(500).json({message: 'Unable to read sheet title'});
    }

    const [matrixRes, settlementRes, bazarRes, utilityRes] = await Promise.all([
      sheets.spreadsheets.values.get({spreadsheetId: SPREADSHEET_ID, range: `${sheetTitle}!A1:H33`}),
      sheets.spreadsheets.values.get({spreadsheetId: SPREADSHEET_ID, range: `${sheetTitle}!A45:G53`}),
      sheets.spreadsheets.values.get({spreadsheetId: SPREADSHEET_ID, range: `${sheetTitle}!J1:Q30`}),
      sheets.spreadsheets.values.get({spreadsheetId: SPREADSHEET_ID, range: `${sheetTitle}!A60:G67`}),
    ]);

    const matrix = matrixRes.data.values || [];
    const settlement = settlementRes.data.values || [];
    const bazar = bazarRes.data.values || [];
    const utility = utilityRes.data.values || [];

    const mealCounts = (matrix[1]?.slice(1, 8) || []).map((v) => parseInt(v || '0', 10) || 0);
    const totalMeals = mealCounts.reduce((a, b) => a + b, 0);

    const bazarTotalRow = bazar.find((r) => String(r[0]).toLowerCase() === 'total');
    const bazarTotal = bazarTotalRow ? bazarTotalRow.slice(1).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) : 0;

    const utilityTotal = utility.slice(1).reduce((sum, row) => {
      const val = parseFloat(row[2]);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    const settlementData = settlement.slice(1).map((row) => ({
      name: String(row[0] || ''),
      total: parseFloat(row[1]) || 0,
      settlement: parseFloat(row[6]) || 0,
    })).filter((s) => s.name);

    const expenseDetailsData = [];
    try {
      const pendingSnap = await admin.firestore().collection('pending').doc(req.user.uid).get();
      if (pendingSnap.exists) {
        const pendingValues = pendingSnap.data()?.pending?.pendingValues || [];
        expenseDetailsData.push(
          ...pendingValues.map((item) => ({
            date: item.timestamp || new Date().toISOString().split('T')[0],
            itemName: String(item.itemName || ''),
            qty: parseFloat(item.quantity) || 0,
          })),
        );
      }
    } catch (e) {
      console.warn('Failed to read pending expenses from Firestore', e);
    }

    const ledger = {
      meals: totalMeals,
      bazaarCost: Number(bazarTotal.toFixed(2)),
      mealRate: totalMeals > 0 ? Number((bazarTotal / totalMeals).toFixed(2)) : 0,
      utilityCost: Number(utilityTotal.toFixed(2)),
      totalCost: Number((bazarTotal + utilityTotal).toFixed(2)),
    };

    res.status(200).json({ledger, settlementData, expenseDetailsData});
  } catch (error) {
    console.error('getLedger error', error);
    res.status(500).json({message: 'Failed to fetch ledger', error: error.message});
  }
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT} for <7B> ...`);
});
