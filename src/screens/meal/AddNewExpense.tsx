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
  quantity: number;
  price: number;
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

  //using callbacks so that children component ExpenseComponent can update
  //parents component's state inside its scope.
  const updateItemName = (index: number, value: string) => {
    console.log('selected index =>', index);
    setItemList(prev =>
      prev.map((item, ind) => {
        // console.log('print it =>', item);
        return item.id === index ? {...item, itemName: value} : {...item};
      }),
    );
  };

  const updateQuantity = (index: number, value: number) => {
    console.log('selected index =>', index);
    setItemList(prev =>
      prev.map((item, ind) => {
        return item.id === index ? {...item, quantity: value} : {...item};
      }),
    );
  };

  const updatePrice = (index: number, value: number) => {
    setItemList(prev =>
      prev.map((item, ind) => {
        return item.id === index ? {...item, price: value} : {...item};
      }),
    );
  };

  // React.useEffect(() => {
  //   console.log(itemList);
  // }, [itemList]);

  return (
    <MainLayout
      noScroll={false}
      floatingButton
      floatingButtonComponent={<Foundation name="plus" size={30} />}
      floatingButtonOnPress={() => {
        setItemList(prev => [
          ...prev,
          {id: prev.length, itemName: '', price: 0, quantity: 0},
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
                no={index}
                updateFirstTextInput={updateItemName}
                updatePrice={updatePrice}
                updateQuantity={updateQuantity}
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
