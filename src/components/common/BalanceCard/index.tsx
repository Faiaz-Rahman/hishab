import {
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInDown, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Colors, Dim} from '@constants';
import moment from 'moment';
import AppText from '@components/common/Text';

import Entypo from '@react-native-vector-icons/entypo';

interface BalanceCardProps {
  size: 'sm' | 'lg';
  showDate?: boolean;
  balance?: number;
  heading?: string;
  showRoundedBalance?: boolean;
  onExpand?: () => void;
  extraStyles?: ViewStyle;
  textStyles?: TextStyle;
}

export default function BalanceCard({
  size = 'lg',
  showDate,
  balance,
  heading,
  showRoundedBalance,
  onExpand,
  extraStyles,
  textStyles,
}: BalanceCardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({transform: [{scale: scale.value}]}));
  const content = (
    <>
      {size === 'lg' ? (
        <>
          {showDate && <AppText styles={{...styles.date, ...textStyles}}>{moment().format('MMMM DD, YYYY')}</AppText>}
          <AppText styles={{...styles.heading, ...textStyles}}>{heading}</AppText>
          <AppText styles={{...styles.balance, ...textStyles}}>{balance?.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}<AppText styles={styles.currency}> ৳</AppText></AppText>
        </>
      ) : (
        <>
          <Pressable onPress={onExpand} style={styles.headerWrapper}>
            <AppText styles={styles.smallHeading}>{heading}</AppText>
            <Entypo name="chevron-thin-right" size={14} color={Colors.muted} />
          </Pressable>
          <AppText styles={styles.smallBalance}>{showRoundedBalance ? balance?.toLocaleString() : balance?.toFixed(2)}<AppText styles={styles.smallCurrency}> ৳</AppText></AppText>
        </>
      )}
    </>
  );
  return (
    <Animated.View entering={FadeInDown.delay(size === 'lg' ? 80 : 180).duration(450)} style={animatedStyle}>
    <Pressable
      onPressIn={() => { scale.value = withSpring(0.98); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      style={[
        styles.balanceCard,
        {
          height: size === 'sm' ? 128 : 205,
          width: size === 'sm' ? Dim.width * 0.4 : Dim.width * 0.85,
        },
        extraStyles,
      ]}>
      {size === 'lg' ? <LinearGradient colors={['#D7FF68', '#A5E72A']} style={styles.gradient}>{content}</LinearGradient> : content}
    </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    alignSelf: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    padding: 20,
    backgroundColor: Colors.socialBlack,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  gradient: {flex: 1, padding: 20, justifyContent: 'space-between', borderRadius: 24},
  date: {color: '#35400E', fontSize: 12, fontFamily: 'Poppins-SemiBold'},
  heading: {color: '#35400E', fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 'auto'},
  balance: {color: '#121A08', fontSize: 35, fontFamily: 'Poppins-Bold', letterSpacing: -1.2},
  currency: {fontSize: 20, fontFamily: 'Poppins-SemiBold'},
  smallHeading: {color: Colors.muted, fontSize: 12, fontFamily: 'Poppins-Medium'},
  smallBalance: {fontSize: 25, marginTop: 'auto', fontFamily: 'Poppins-SemiBold'},
  smallCurrency: {fontSize: 14, color: Colors.lime},
  headerWrapper: {
    width: '100%',
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
