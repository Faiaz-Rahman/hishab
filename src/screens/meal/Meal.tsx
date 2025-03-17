import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import MainLayout from '@layouts/MainLayout';

import BalanceCard from '@components/common/BalanceCard';
import {Colors, Dim} from '@constants';
import RedirectButton from '@components/common/RedirectButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@store/index';

import firebase from '@react-native-firebase/firestore';

export default function Meal() {
  const navigation = useNavigation();

  const {fcmToken, userInfo} = useSelector((state: RootState) => state.auth);

  const appendFcmTokenToUser = async () => {
    await firebase().collection('users').doc(userInfo.uid).update({
      fcm: fcmToken,
    });
  };

  React.useEffect(() => {
    if (fcmToken) {
      appendFcmTokenToUser();
    }
  }, [fcmToken]);

  return (
    <MainLayout noScroll={false}>
      <BalanceCard
        size="lg"
        showDate
        balance={500}
        extraStyles={{
          backgroundColor: Colors.lime,
        }}
        textStyles={{
          color: '#000',
        }}
        heading="Your meal balance is:"
      />
      <View style={styles.balanceCardWrapper}>
        <BalanceCard
          size="sm"
          balance={62.76}
          heading="meal rate"
          onExpand={() => {
            console.log('expand meal rate');
          }}
          extraStyles={{
            borderWidth: 3,
            borderColor: Colors.lime,
          }}
        />
        <BalanceCard
          size="sm"
          balance={9057}
          showRoundedBalance
          onExpand={() => {
            console.log('expand funds');
          }}
          extraStyles={{
            borderWidth: 3,
            borderColor: Colors.lime,
          }}
        />
      </View>

      <RedirectButton
        title="All Expenses"
        onPress={() => {
          console.log('all expenses');
          navigation.navigate('all_expenses' as never);
        }}
        extraStyle={{
          marginTop: 25,
        }}
      />

      <RedirectButton
        title="Add New Expense"
        onPress={() => {
          console.log('add new expense');
          navigation.navigate('new_expense' as never);
        }}
        extraStyle={{
          marginTop: 25,
        }}
      />

      <RedirectButton
        title="Update My Meal"
        onPress={() => {
          //   console.log('all expenses');
          navigation.navigate('update_meal' as never);
        }}
        extraStyle={{
          marginTop: 25,
        }}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  meal: {},
  balanceCardWrapper: {
    flexDirection: 'row',
    width: Dim.width * 0.85,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
});
