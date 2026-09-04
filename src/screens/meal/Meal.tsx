import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';

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
import {api} from '../../../src/services/api';

const DEFAULT_LEDGER = {
  meals: 0,
  bazaarCost: 0,
  mealRate: 0,
  utilityCost: 0,
  totalCost: 0,
};

export default function Meal() {
  const navigation = useNavigation();
  const [ledger, setLedger] = useState(DEFAULT_LEDGER);

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

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await api.getLedger();
        if (mounted && res.ledger) {
          setLedger(res.ledger);
        }
      } catch (e) {
        console.warn('Failed to load ledger', e);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const formatHeading = `Total Meal \n Cost`;

  return (
    <MainLayout noScroll={false}>
      <BalanceCard
        size="lg"
        showDate
        balance={ledger.totalCost}
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
          balance={ledger.mealRate}
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
          balance={ledger.bazaarCost}
          heading={formatHeading}
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
            {ledger.meals} total meals
          </AppText>
        </View>
        <View style={styles.utilityPill}>
          <AppText styles={styles.utilityText}>
            ৳{ledger.utilityCost.toLocaleString()} utilities
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
