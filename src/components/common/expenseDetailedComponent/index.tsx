import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Dim} from '@constants';
import AppText from '../Text';

interface ExpenseDetailedComponentProps {
  date: string;
  itemName: string;
  qty: number;
}

export default function ExpenseDetailedComponent({
  date,
  itemName,
  qty,
}: ExpenseDetailedComponentProps) {
  return (
    <View style={styles.expenseDetailedComponent}>
      <View style={styles.detailsWrapper}>
        <View style={styles.detailsHeaderWrapper}>
          <AppText styles={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
            Muhammad Fiaz
          </AppText>
          <AppText styles={styles.detailsText}>{date}</AppText>
        </View>
        <View style={styles.detailsInnerWrapper}>
          <View style={{width: '75%'}}>
            <AppText styles={styles.detailsText}>Item: {itemName}</AppText>
          </View>

          <View style={{width: '25%', alignItems: 'flex-end', paddingRight: 8}}>
            <AppText styles={styles.detailsText}>Qty: {qty}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.costWrapper}>
        <AppText styles={styles.costText}>100৳</AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  expenseDetailedComponent: {
    height: 70,
    width: Dim.width * 0.9,
    backgroundColor: Colors.socialBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
  costWrapper: {
    height: 40,
    width: '25%',
    borderRadius: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.lime,
  },
  costText: {
    color: Colors.lime,
    fontSize: 17,
    fontFamily: 'Roboto-Bold',
  },
  detailsWrapper: {
    width: '75%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  detailsInnerWrapper: {
    width: '100%',
    height: '30%',
    // backgroundColor: 'tomato',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsText: {
    fontSize: 12,
    fontFamily: 'Roboto-Light',
  },
  detailsHeaderWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'gold',
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'space-between',
  },
});
