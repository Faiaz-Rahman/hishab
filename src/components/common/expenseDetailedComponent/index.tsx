import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors, Dim} from '@constants';
import AppText from '../Text';

import Feather from '@react-native-vector-icons/feather';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

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
      <View style={styles.iconWrapper}>
        <Feather name="package" size={20} color={Colors.lime} />
      </View>
      <View style={styles.detailsWrapper}>
        <View style={styles.detailsHeaderWrapper}>
          <AppText styles={styles.itemName}>{itemName}</AppText>
          <AppText styles={styles.qtyText}>Qty: {qty}</AppText>
        </View>
        <View style={styles.detailsInnerWrapper}>
          <View style={styles.dateBadge}>
            <AppText styles={styles.dateText}>{date}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.costWrapper}>
        <MaskedView
          maskElement={
            <View style={styles.costMask}>
              <Text style={styles.costText}>100৳</Text>
            </View>
          }>
          <LinearGradient
            colors={['#C8F542', '#0A3D1E']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.costGradient}
          />
        </MaskedView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  expenseDetailedComponent: {
    width: Dim.width * 0.9,
    minHeight: 92,
    backgroundColor: Colors.socialBlack,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderLeftWidth: 3,
    borderLeftColor: Colors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 12,
    backgroundColor: Colors.pureBlack,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  detailsWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  detailsHeaderWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  dateBadge: {
    backgroundColor: Colors.pureBlack,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: Colors.lighterGray,
  },
  detailsInnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  qtyText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.muted,
  },
  costWrapper: {
    marginLeft: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  costMask: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  costGradient: {
    width: 80,
    height: 30,
    borderRadius: 8,
  },
  costText: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    letterSpacing: -0.5,
  },
});
