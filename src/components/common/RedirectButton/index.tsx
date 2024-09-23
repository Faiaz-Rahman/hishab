import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewProps,
  Pressable,
} from 'react-native';
import React from 'react';
import AppText from '../Text';
import {Colors, Dim} from '@constants';

import Entypo from 'react-native-vector-icons/Entypo';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
  const rotate = animated
    ? animatedValue == 0 || animatedValue == 1
      ? useSharedValue<number>(animatedValue)
      : null
    : null;

  const handlePress = () => {
    if (rotate) {
      rotate.value = animatedValue ? 0 : 1;
    }
  };

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(animatedValue ? '90deg' : '0deg', {
            duration: 1000,
            stiffness: 50,
          }),
        },
      ],
    };
  });

  return animated ? (
    <Pressable
      style={[styles.redirectButton, extraStyle]}
      onPress={() => {
        onPress();
        handlePress();
      }}>
      <AppText
        styles={{
          color: Colors.lighterGray,
          fontFamily: 'Roboto-Bold',
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
          color: Colors.lighterGray,
          fontFamily: 'Roboto-Bold',
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
    height: 70,
    width: Dim.width * 0.85,
    alignSelf: 'center',
    backgroundColor: Colors.socialBlack,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
