import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '@constants';
import AppText from '../Text';
import {ButtonProps} from '@interfaces/*';

export default function Button({
  width,
  title,
  buttonStyle,
  titleStyle,
  onPress,
  children,
  disabled = false,
  useGradient = true,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, {width}, buttonStyle]}
      disabled={disabled}
      onPress={onPress}>
      {useGradient ? (
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
            {disabled ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : (
              <>
                {title}
                {children}
              </>
            )}
          </AppText>
        </LinearGradient>
      ) : (
        <>
          <AppText
            styles={{
              fontFamily: 'Poppins-SemiBold',
              ...titleStyle,
            }}>
            {disabled ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : (
              <>
                {title}
                {children}
              </>
            )}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
