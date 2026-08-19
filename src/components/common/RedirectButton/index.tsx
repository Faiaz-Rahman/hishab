import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import AppText from '../Text';
import {Colors, Dim} from '@constants';

import Entypo from '@react-native-vector-icons/entypo';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type RedirectButtonProps = {
  extraStyle?: Object;
  title: string;
  onPress: () => void;
  animated?: boolean;
  animatedValue?: number;
};

export default function RedirectButton({
  extraStyle,
  onPress,
  title,
  animated = false,
  animatedValue,
}: RedirectButtonProps) {
  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(animatedValue ? '90deg' : '0deg', {duration: 220}),
        },
      ],
    };
  });

  return animated ? (
    <Pressable
      style={[styles.redirectButton, extraStyle]}
      onPress={() => {
        onPress();
      }}>
      <AppText
        styles={{
          color: Colors.socialWhite,
          fontFamily: 'Poppins-Medium',
        }}>
        {title}
      </AppText>
      <Animated.View style={rotateStyle}>
        <Entypo name="chevron-thin-right" size={20} color={'#fff'} />
      </Animated.View>
    </Pressable>
  ) : (
    <Pressable style={[styles.redirectButton, extraStyle]} onPress={onPress}>
      <AppText
        styles={{
        color: Colors.socialWhite,
        fontFamily: 'Poppins-Medium',
        }}>
        {title}
      </AppText>

      <Entypo name="chevron-thin-right" size={20} color={'#fff'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  redirectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    width: Dim.width * 0.85,
    alignSelf: 'center',
    backgroundColor: Colors.socialBlack,
    borderRadius: 18,
    paddingLeft: 18,
    paddingRight: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
});
