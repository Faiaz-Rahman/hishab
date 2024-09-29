import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import Header from '@components/common/Header';

export default function AllExpenses() {
  const navigation = useNavigation();
  return (
    <MainLayout noScroll={false}>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title="All Expenses"
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
        }}
      />
    </MainLayout>
  );
}
