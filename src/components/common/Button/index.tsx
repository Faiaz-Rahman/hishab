import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '@constants';
import AppText from '../Text';

interface ButtonProps {
  width: number;
  title: string;
  buttonStyle?: ViewStyle;
  titleStyle?: Object;
  onPress: () => void;
}

export default function Button({
  width,
  title,
  buttonStyle,
  titleStyle,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, {width}, buttonStyle]}
      onPress={onPress}>
      <LinearGradient
        colors={Colors.gradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        locations={[0, 0.25, 0.6]}
        style={styles.gradient}>
        <AppText
          styles={{
            fontFamily: 'Poppins-SemiBold',
            ...titleStyle,
          }}>
          {title}
        </AppText>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
