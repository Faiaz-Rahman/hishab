import {View, StyleSheet, ActivityIndicator, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '@layouts/MainLayout';

import Foundation from '@react-native-vector-icons/foundation';
import Header from '@components/common/Header';
import {useNavigation} from '@react-navigation/native';
import {Colors, Dim} from '@constants';

import AppText from '@components/common/Text';
import ExpenseComponent from '@components/common/expenseComponent';
import Button from '@components/common/Button';

import {FormikErrors, useFormik} from 'formik';
import * as yup from 'yup';

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

import uuid from 'react-native-uuid';

export interface ItemListType {
  id?: string;
  itemName: string;
  quantity: string;
  price: string;
  timestamp?: string;
}

const addNewExpenseFormValidationSchema = yup.object().shape({
  item: yup.array().of(
    yup.object().shape({
      id: yup.string().notRequired(),
      itemName: yup.string().required('Please, add the item name'),
      quantity: yup.string().required('Please, add quantity'),
      price: yup.string().required('Please, add the price'),
      timestamp: yup.string(),
    }),
  ),
});

export default function AddNewExpense() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNewExpenseForm = useFormik({
    initialValues: {
      item: [] as Array<ItemListType>,
    },
    validationSchema: addNewExpenseFormValidationSchema,
    onSubmit: async values => {
      await updateNewExpenseListToFb(values.item);
    },
  });

  const handleDelete = (item: ItemListType) => {
    const updatedItemForm = [...addNewExpenseForm.values.item];

    const updatedArrAfterDeletion = updatedItemForm.filter((_val, _) => {
      return _val.id != item.id;
    });

    addNewExpenseForm.setFieldValue('item', updatedArrAfterDeletion);
  };

  //using callbacks so that children component ExpenseComponent can update
  //parents component's state inside its scope.
  const updateItemProperty = (
    index: number,
    value: string | number,
    attr: keyof ItemListType,
  ) => {
    const existingItems = [...addNewExpenseForm.values.item];

    const updatedItems = existingItems.map((_existing, _ind) => {
      if (index == _ind) {
        return {
          ..._existing,
          [attr]:
            typeof _existing[attr] == 'number'
              ? (value as number)
              : (value as string),
          timestamp: moment(new Date()).format('lll'),
        };
      }
      return _existing;
    });

    addNewExpenseForm.setFieldValue('item', updatedItems);
  };

  const updateNewExpenseListToFb = async (values: Array<ItemListType>) => {
    setIsLoading(true);
    try {
      const newExpense = await firestore()
        .collection('pending')
        .doc(`${auth().currentUser?.uid}`)
        .get();

      let totalPr = values.reduce(
        (total, item: ItemListType) => total + parseInt(item.price),
        0,
      );

      if (!newExpense.exists) {
        console.log('no such collection');

        await firestore()
          .collection('pending')
          .doc(`${auth().currentUser?.uid}`)
          .set({
            pending: {
              pendingValues: values,
              totalPrice: totalPr,
            },
          })
          .then(() => {
            console.log('value updated to new-expense');
            addNewExpenseForm.setFieldValue('item', [] as Array<ItemListType>);

            ToastAndroid.showWithGravity(
              'Added your new expenses into account',
              1500,
              10,
            );
          });
      } else {
        console.log(
          'collection exists with following data =>',
          newExpense.data(),
        );

        const dataInFb = newExpense.data()?.pending;
        const existingTotalExpenditure = newExpense.data()?.pending?.totalPrice;

        await firestore()
          .collection('pending')
          .doc(`${auth().currentUser?.uid}`)
          .update({
            pending: {
              pendingValues: [...dataInFb.pendingValues, ...values],
              totalPrice: totalPr + existingTotalExpenditure,
            },
          })
          .then(() => {
            console.log('value updated to new-expense');
            addNewExpenseForm.setFieldValue('item', [] as Array<ItemListType>);

            ToastAndroid.showWithGravity(
              'Added your new expenses into account',
              1500,
              10,
            );
          });
      }
    } catch (error) {
      console.log('error in add-new-expense =>', error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // React.useEffect(() => {
  //   console.log(addNewExpenseForm.values);
  // }, [addNewExpenseForm.values]);

  return (
    <MainLayout
      noScroll={false}
      floatingButton
      stickyHeader={<Header
        onPressBackButton={() => navigation.goBack()}
        title="New Expense"
        titleStyle={{fontSize: 20, fontFamily: 'Roboto-Medium'}}
      />}
      floatingButtonComponent={<Foundation name="plus" size={30} />}
      floatingButtonOnPress={() => {
        const currentItemListForm = [...addNewExpenseForm.values.item];

        currentItemListForm.push({
          id: uuid.v4(),
          itemName: '',
          price: '',
          quantity: '',
        } as ItemListType);

        addNewExpenseForm.setFieldValue('item', currentItemListForm);
      }}>
      <View style={styles.expenseWrapper}>
        {addNewExpenseForm.values.item.length === 0 ? (
          <AppText styles={{marginTop: 20, color: Colors.lighterGray}}>
            No Expense added
          </AppText>
        ) : (
          addNewExpenseForm.values.item.map(
            (item, index): React.JSX.Element => {
              return (
                <ExpenseComponent
                  key={`itemList_${index}`}
                  no={index}
                  updateFirstTextInput={text => {
                    updateItemProperty(index, text, 'itemName');
                  }}
                  updatePrice={text => {
                    updateItemProperty(index, parseInt(text), 'price');
                  }}
                  updateQuantity={text => {
                    updateItemProperty(index, text, 'quantity');
                  }}
                  onDelete={() => {
                    handleDelete(item);
                  }}
                  itemNameErrorMessage={
                    (
                      addNewExpenseForm.errors.item?.[
                        index
                      ] as FormikErrors<ItemListType>
                    )?.itemName
                      ? (
                          addNewExpenseForm.errors?.item?.[
                            index
                          ] as FormikErrors<ItemListType>
                        )?.itemName
                      : ''
                  }
                  itemQuantityErrorMessage={
                    (
                      addNewExpenseForm.errors?.item?.[
                        index
                      ] as FormikErrors<ItemListType>
                    )?.quantity
                      ? (
                          addNewExpenseForm.errors?.item?.[
                            index
                          ] as FormikErrors<ItemListType>
                        )?.quantity
                      : ''
                  }
                  priceErrorMessage={
                    (
                      addNewExpenseForm.errors?.item?.[
                        index
                      ] as FormikErrors<ItemListType>
                    )?.price
                      ? (
                          addNewExpenseForm.errors?.item?.[
                            index
                          ] as FormikErrors<ItemListType>
                        )?.price
                      : ''
                  }
                />
              );
            },
          )
        )}
      </View>

      {addNewExpenseForm.values.item.length > 0 && (
        <Button
          onPress={async () => {
            addNewExpenseForm.handleSubmit();
          }}
          disabled={isLoading}
          title={isLoading ? '' : 'Update'}
          width={Dim.width * 0.8}
          useGradient={false}
          titleStyle={styles.updateButtonText}
          buttonStyle={{
            alignSelf: 'center',
            marginTop: 9,
            height: 52,
            backgroundColor: 'transparent',
            borderColor: Colors.lime,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isLoading && <ActivityIndicator color={'#fff'} />}
        </Button>
      )}
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
    gap: 12,
    width: Dim.width,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  updateButtonText: {color: Colors.lime},
});
