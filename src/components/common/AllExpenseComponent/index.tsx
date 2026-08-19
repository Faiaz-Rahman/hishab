import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Colors, Dim} from '@constants';
import AppText from '@components/common/Text';

import Entypo from '@react-native-vector-icons/entypo';
import Animated, {FadeInRight} from 'react-native-reanimated';

type AllExpenseComponent = {
  username: string;
  children: React.ReactNode;
  totalAmount: number;
  onPress: () => void;
  caption?: string;
  amountColor?: string;
};

export default function AllExpenseComponent({
  username,
  children,
  totalAmount,
  onPress,
  caption = 'Shared cost',
  amountColor = Colors.socialWhite,
}: AllExpenseComponent) {
  return (
    <Animated.View entering={FadeInRight.duration(350)}>
    <Pressable style={styles.componentWrapper} onPress={onPress}>
      {children}

      {/* username */}
      <View style={styles.profileDetailsWrapper}>
        <View><AppText styles={styles.username}>{username}</AppText><AppText styles={styles.caption}>{caption}</AppText></View>
        <View style={styles.amountWrapper}>
          <AppText styles={{...styles.amount, color: amountColor}}>
            ৳{totalAmount.toLocaleString()}
          </AppText>

          <Entypo name="chevron-thin-right" size={15} color={'#fff'} />
        </View>
      </View>
    </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  componentWrapper: {
    width: Dim.width * 0.85,
    minHeight: 78,
    backgroundColor: Colors.socialBlack,
    borderRadius: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
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
  username: {marginLeft: 12, fontFamily: 'Poppins-SemiBold'},
  caption: {fontSize: 10, color: Colors.lighterGray, marginLeft: 12, marginTop: 2},
  amount: {fontSize: 16, fontFamily: 'Poppins-SemiBold'},
});
