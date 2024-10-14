import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';
import Header from '@components/common/Header';
import {useNavigation} from '@react-navigation/native';
import ExpenseDetailedComponent from '@components/common/expenseDetailedComponent';

type expenseDataType = {
  date: string;
  itemName: string;
  qty: number;
};

export default function DetailedExpense() {
  const navigation = useNavigation();

  const expenseDetailsData: Array<expenseDataType> = [
    {
      date: '21 Sep, 2024',
      itemName: 'Chicken',
      qty: 4,
    },
    {
      date: '20 Sep, 2024',
      itemName: 'Chicken',
      qty: 1,
    },
    {
      date: '23 Sep, 2024',
      itemName: 'Chicken',
      qty: 2,
    },
    {
      date: '25 Sep, 2024',
      itemName: 'Chicken',
      qty: 1,
    },
    {
      date: '22 Sep, 2024',
      itemName: 'Chicken',
      qty: 3,
    },
  ];

  return (
    <MainLayout noScroll={false}>
      <Header
        onPressBackButton={() => {
          navigation.goBack();
        }}
        title="Expense Details"
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
        }}
      />
      <View style={{gap: 25}}>
        {expenseDetailsData.map((item, index) => {
          return (
            <ExpenseDetailedComponent
              key={`expenseDetailed${index}`}
              date={(item as expenseDataType).date}
              itemName={(item as expenseDataType).itemName}
              qty={(item as expenseDataType).qty}
            />
          );
        })}
      </View>
    </MainLayout>
  );
}
