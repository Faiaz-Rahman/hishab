import auth from '@react-native-firebase/auth';

const BASE_URL = process.env.BASE_URL!;

const getAuthHeader = async () => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('No authenticated user');
  }
  const token = await user.getIdToken();
  return {Authorization: `Bearer ${token}`};
};

export const api = {
  syncMeals: async (selections: {}) => {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/syncMeals`, {
      method: 'POST',
      headers: {...headers, 'Content-Type': 'application/json'},
      body: JSON.stringify({selections}),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to sync meals');
    }
    return response.json();
  },

  syncExpense: async (payload: {}) => {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/syncExpense`, {
      method: 'POST',
      headers: {...headers, 'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to sync expense');
    }
    return response.json();
  },

  getLedger: async () => {
    const headers = await getAuthHeader();
    const response = await fetch(`${BASE_URL}/getLedger`, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to fetch ledger');
    }
    return response.json();
  },
};
