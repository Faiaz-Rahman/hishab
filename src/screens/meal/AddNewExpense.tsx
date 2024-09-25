import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';

import Foundation from 'react-native-vector-icons/Foundation';

export default function AddNewExpense() {
  return (
    <MainLayout
      noScroll={false}
      floatingButton
      floatingButtonComponent={<Foundation name="plus" size={30} />}>
      <View></View>
    </MainLayout>
  );
}
