import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainLayout from '@layouts/MainLayout';
import Header from '@components/common/Header';
import {useNavigation} from '@react-navigation/native';
import ExpenseDetailedComponent from '@components/common/expenseDetailedComponent';
import AppText from '@components/common/Text';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Colors, Dim} from '@constants';
import {api} from '../../../src/services/api';

type expenseDataType = {
  date: string;
  itemName: string;
  qty: number;
};

export default function DetailedExpense() {
  const navigation = useNavigation();
  const [expenseDetailsData, setExpenseDetailsData] = useState<
    Array<expenseDataType>
  >([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await api.getLedger();
        if (mounted && res.expenseDetailsData) {
          setExpenseDetailsData(res.expenseDetailsData);
        }
      } catch (e) {
        console.warn('Failed to load expense details', e);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

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
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <View style={styles.accentLine} />
          <AppText styles={styles.sectionLabel}>EXPENSE BREAKDOWN</AppText>
        </View>
        <View style={{gap: 16}}>
          {expenseDetailsData.map((item, index) => {
            return (
              <Animated.View
                key={`expenseDetailed${index}`}
                entering={FadeInDown.delay(index * 80).duration(450)}
                style={styles.cardWrapper}>
                <ExpenseDetailedComponent
                  date={(item as expenseDataType).date}
                  itemName={(item as expenseDataType).itemName}
                  qty={(item as expenseDataType).qty}
                />
              </Animated.View>
            );
          })}
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dim.width,
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dim.width * 0.9,
    alignSelf: 'center',
    marginBottom: 16,
    gap: 12,
  },
  accentLine: {
    width: 4,
    height: 16,
    borderRadius: 2,
    backgroundColor: Colors.lime,
  },
  sectionLabel: {
    fontSize: 12,
    color: Colors.lighterGray,
    letterSpacing: 1.2,
    fontFamily: 'Poppins-SemiBold',
  },
  cardWrapper: {
    width: Dim.width * 0.9,
    alignSelf: 'center',
  },
});
