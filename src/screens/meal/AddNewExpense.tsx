import {View, Text, StyleSheet, useAnimatedValue} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '@layouts/MainLayout';

import Foundation from 'react-native-vector-icons/Foundation';
import Header from '@components/common/Header';
import {useNavigation} from '@react-navigation/native';
import {Colors, Dim} from '@constants';

import AppText from '@components/common/Text';
import ExpenseComponent from '@components/common/expenseComponent';

type ItemListType = {
  id?: number;
  itemName: string;
  quantity: string;
  price: string;
};

export default function AddNewExpense() {
  const [itemList, setItemList] = useState<ItemListType[]>([]);
  const navigation = useNavigation();

  const handleDelete = (item: ItemListType) => {
    setItemList(prev =>
      prev.map(val => val.id === item.id)
        ? prev.filter(val => val.id !== item.id)
        : [],
    );
  };

  return (
    <MainLayout
      noScroll={false}
      floatingButton
      floatingButtonComponent={<Foundation name="plus" size={30} />}
      floatingButtonOnPress={() => {
        setItemList(prev => [
          ...prev,
          {id: prev.length, itemName: '', price: '', quantity: ''},
        ]);
      }}>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title="New Expense"
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
        }}
      />

      <View style={styles.expenseWrapper}>
        {itemList.length === 0 ? (
          <AppText styles={{marginTop: 20, color: Colors.lighterGray}}>
            No Expense added
          </AppText>
        ) : (
          itemList.map((item, index): React.JSX.Element => {
            return (
              <ExpenseComponent
                key={`itemList_${index}`}
                no={index + 1}
                onDelete={() => {
                  handleDelete(item);
                }}
              />
            );
          })
        )}
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: Dim.width,
    // backgroundColor: 'red',
    gap: 10,
  },
  extraTextInputStyle: {
    width: Dim.width * 0.8,
    height: 70,
    borderRadius: 10,
  },
  expenseWrapper: {
    gap: 35,
    width: Dim.width,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
});
