import { api } from '../src/services/api';

export const syncMeals = async ({ uid, name, dateRange, selections }) => {
  const response = await api.syncMeals({
    uid,
    name,
    dateRange,
    selections
  });
  return response;
};

export const syncExpense = async ({ uid, itemName, qty, price, date }) => {
  const response = await api.syncExpense({
    uid,
    itemName,
    qty,
    price,
    date
  });
  return response;
};

export const getLedger = async () => {
  const response = await api.getLedger();
  return response;
};
