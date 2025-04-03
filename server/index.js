// firebase admin implementation  ...

require('dotenv').config();

const express = require('express');
const admin = require('firebase-admin');

const PORT = process.env.PORT || 3000;

// var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    projectId: process.env.PROJECT_ID,
  }),
});

const app = express();
app.use(express.json());

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

app.listen(PORT, () => {
  console.log('server started on 3000 for <7B> ...');
});
