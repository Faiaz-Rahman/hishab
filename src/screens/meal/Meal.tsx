import {View, StyleSheet} from 'react-native';
import React from 'react';

import MainLayout from '@layouts/MainLayout';

import BalanceCard from '@components/common/BalanceCard';
import {Colors, Dim} from '@constants';
import RedirectButton from '@components/common/RedirectButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@store/index';

import firebase from '@react-native-firebase/firestore';
import AppText from '@components/common/Text';
import Animated, {FadeInDown} from 'react-native-reanimated';

const AUGUST_LEDGER = {
  meals: 166,
  bazaarCost: 6510,
  mealRate: 39.22,
  utilityCost: 4150,
  totalCost: 10660.24,
};

export default function Meal() {
  const navigation = useNavigation();

  const {fcmToken, userInfo} = useSelector((state: RootState) => state.auth);

  const appendFcmTokenToUser = React.useCallback(async () => {
    await firebase().collection('users').doc(userInfo.uid).update({
      fcm: fcmToken,
    });
  }, [fcmToken, userInfo.uid]);

  React.useEffect(() => {
    if (fcmToken) {
      appendFcmTokenToUser();
    }
  }, [appendFcmTokenToUser, fcmToken]);

  return (
    <MainLayout noScroll={false}>
      <BalanceCard
        size="lg"
        showDate
        balance={AUGUST_LEDGER.totalCost}
        extraStyles={{
          backgroundColor: Colors.lime,
        }}
        textStyles={{
          color: '#000',
        }}
        heading="August shared cost"
      />
      <View style={styles.balanceCardWrapper}>
        <BalanceCard
          size="sm"
          balance={AUGUST_LEDGER.mealRate}
          heading="Meal rate"
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
          balance={AUGUST_LEDGER.bazaarCost}
          heading={`Total Meal \n Cost`}
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

      <Animated.View
        entering={FadeInDown.delay(260).duration(450)}
        style={styles.insightCard}>
        <View>
          <AppText styles={styles.insightLabel}>MONTHLY SNAPSHOT</AppText>
          <AppText styles={styles.insightTitle}>
            {AUGUST_LEDGER.meals} total meals
          </AppText>
        </View>
        <View style={styles.utilityPill}>
          <AppText styles={styles.utilityText}>
            ৳{AUGUST_LEDGER.utilityCost.toLocaleString()} utilities
          </AppText>
        </View>
      </Animated.View>

      <AppText styles={styles.sectionLabel}>MANAGE HOUSEHOLD LEDGER</AppText>

      <RedirectButton
        title="All Expenses"
        onPress={() => {
          console.log('all expenses');
          navigation.navigate('all_expenses' as never);
        }}
        extraStyle={{
          marginTop: 12,
        }}
      />

      <RedirectButton
        title="Add New Expense"
        onPress={() => {
          console.log('add new expense');
          navigation.navigate('new_expense' as never);
        }}
        extraStyle={{
          marginTop: 12,
        }}
      />

      <RedirectButton
        title="Update My Meal"
        onPress={() => {
          //   console.log('all expenses');
          navigation.navigate('update_meal' as never);
        }}
        extraStyle={{
          marginTop: 12,
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
    marginTop: 14,
  },
  insightCard: {
    width: Dim.width * 0.85,
    alignSelf: 'center',
    marginTop: 18,
    padding: 17,
    borderRadius: 18,
    backgroundColor: '#262438',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightLabel: {
    fontSize: 10,
    color: '#B4A8ED',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
  },
  insightTitle: {fontSize: 17, fontFamily: 'Poppins-SemiBold', marginTop: 3},
  utilityPill: {
    backgroundColor: '#38334F',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  utilityText: {fontSize: 10, color: '#E1DCFF', fontFamily: 'Poppins-Medium'},
  sectionLabel: {
    fontSize: 11,
    color: Colors.lighterGray,
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
    width: Dim.width * 0.85,
    alignSelf: 'center',
    marginTop: 28,
    marginBottom: 2,
  },
});
