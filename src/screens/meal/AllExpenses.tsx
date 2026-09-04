import {View, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainLayout from '@layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import Header from '@components/common/Header';

import AllExpenseComponent from '@components/common/AllExpenseComponent';
import AppText from '@components/common/Text';
import {Colors, Dim} from '@constants';
import {api} from '../../../src/services/api';

type SettlementType = {
  name: string;
  total: number;
  settlement: number;
};

export default function AllExpenses() {
  const navigation = useNavigation();
  const [settlementData, setSettlementData] = useState<SettlementType[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await api.getLedger();
        if (mounted && res.settlementData) {
          setSettlementData(res.settlementData);
        }
      } catch (e) {
        console.warn('Failed to load settlement data', e);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <MainLayout
      noScroll={false}
      stickyHeader={
        <Header
          onPressBackButton={() => navigation.goBack()}
          title="All Expenses"
          titleStyle={{
            fontSize: 20,
            fontFamily: 'Roboto-Medium',
          }}
        />
      }>
      <View style={styles.summary}>
        <View>
          <AppText styles={styles.summaryLabel}>TOTAL SHARED COST</AppText>
          <AppText styles={styles.summaryTotal}>৳10,660.24</AppText>
        </View>
        <AppText
          styles={styles.summaryMeta}>{`166 meals\nAugust ledger`}</AppText>
      </View>
      <AppText styles={styles.section}>TAKE / GIVE SETTLEMENT</AppText>
      <View style={styles.list}>
        {settlementData.map((item, index) => {
          const isTake = item.settlement >= 0;
          return (
            <AllExpenseComponent
              key={`expenseComponent${index}`}
              totalAmount={Math.abs(item.settlement)}
              username={item.name}
              caption={`${
                isTake ? 'To receive' : 'To pay'
              } · shared cost ৳${item.total.toLocaleString()}`}
              amountColor={isTake ? Colors.success : Colors.danger}
              onPress={() => {
                navigation.navigate('detailed_expenses' as never);
              }}>
              <Image
                source={require('@assets/images/user1.png')}
                style={styles.userImage}
              />
            </AllExpenseComponent>
          );
        })}
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 14,
    resizeMode: 'contain',
  },
  summary: {
    width: Dim.width * 0.85,
    alignSelf: 'center',
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#202E28',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#A8D78C',
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  summaryTotal: {fontSize: 23, fontFamily: 'Poppins-Bold', marginTop: 2},
  summaryMeta: {
    fontSize: 11,
    color: '#C6D6C8',
    textAlign: 'right',
    lineHeight: 17,
  },
  section: {
    width: Dim.width * 0.85,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 10,
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.lighterGray,
    fontFamily: 'Poppins-SemiBold',
  },
  list: {gap: 10},
});
