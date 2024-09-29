import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {Colors, Dim} from '@constants';
import AppText from '@components/common/Text';

import Entypo from 'react-native-vector-icons/Entypo';

type AllExpenseComponent = {
  username: string;
  children: React.ReactNode;
  totalAmount: number;
  onPress: () => void;
};

export default function AllExpenseComponent({
  username,
  children,
  totalAmount,
  onPress,
}: AllExpenseComponent) {
  return (
    <Pressable style={styles.componentWrapper} onPress={onPress}>
      {children}

      {/* username */}
      <View style={styles.profileDetailsWrapper}>
        <AppText styles={{marginLeft: 10}}>{username}</AppText>
        <View style={styles.amountWrapper}>
          <AppText styles={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
            {totalAmount}৳
          </AppText>

          <Entypo name="chevron-thin-right" size={15} color={'#fff'} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  componentWrapper: {
    width: Dim.width * 0.85,
    height: 70,
    backgroundColor: Colors.socialBlack,
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  profileDetailsWrapper: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'green',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    height: '100%',
    justifyContent: 'space-between',
    gap: 5,
  },
});
