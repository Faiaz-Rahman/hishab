import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Colors, Dim} from '@constants';
import moment from 'moment';
import AppText from '@components/common/Text';

import Entypo from 'react-native-vector-icons/Entypo';

interface BalanceCardProps {
  size: 'sm' | 'lg';
  showDate?: boolean;
  balance?: number;
  heading?: string;
  showRoundedBalance?: boolean;
  onExpand?: () => void;
}

export default function BalanceCard({
  size = 'lg',
  showDate,
  balance,
  heading,
  showRoundedBalance,
  onExpand,
}: BalanceCardProps) {
  return (
    <View
      style={[
        styles.balanceCard,
        {
          height: size === 'sm' ? Dim.height * 0.2 : Dim.height * 0.3,
          width: size === 'sm' ? Dim.width * 0.4 : Dim.width * 0.85,
        },
      ]}>
      {size === 'lg' ? (
        <>
          <AppText>{moment().format('MMMM DD')}</AppText>
          <AppText
            styles={{
              color: Colors.lighterGray,
              marginTop: 'auto',
            }}>
            {heading}
          </AppText>

          <AppText styles={{fontSize: 40}}>{balance?.toFixed(2)}৳</AppText>
        </>
      ) : (
        <>
          <Pressable
            onPress={() => {
              if (onExpand) {
                onExpand();
              }
            }}
            style={styles.headerWrapper}>
            <AppText
              styles={{
                color: Colors.lighterGray,
                fontSize: 11,
              }}>
              {heading === 'meal rate' ? 'Current Meal\nRate' : 'Fund'}
            </AppText>
            <Entypo name="chevron-thin-right" size={12} color={'#fff'} />
          </Pressable>

          <AppText styles={{fontSize: 25, marginTop: 'auto'}}>
            {showRoundedBalance ? balance : balance?.toFixed(2)}৳
          </AppText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    alignSelf: 'center',
    borderRadius: 35,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    backgroundColor: Colors.socialBlack,
  },
  headerWrapper: {
    width: '100%',
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
