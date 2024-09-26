import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
  ViewStyle,
} from 'react-native';

import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '@constants';

interface AppTextInputProps {
  style?: ViewStyle;
  placeholder: string;
  placeholderTextColor: string;
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (text: string) => void;
  children?: React.ReactNode;
  useGradient?: boolean;
  preIcon?: React.ReactNode;
  showRightIcon?: boolean;
  toggleShowPassword?: () => void;
  showPassword?: boolean;
}

export default function TextInput({
  style,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
  onChangeText,
  children,
  useGradient = true,
  preIcon,
  showRightIcon = false,
  toggleShowPassword,
  showPassword,
}: AppTextInputProps) {
  return (
    <View style={[styles.inputWrapper, style]}>
      <View
        style={[
          styles.inputInnerWrapper,
          {width: showRightIcon ? '85%' : '100%'},
        ]}>
        {preIcon && <View style={styles.preIconWrapper}>{preIcon}</View>}
        <RNTextInput
          secureTextEntry={showPassword ? false : true}
          onChangeText={onChangeText}
          style={[styles.input, {width: preIcon ? '85%' : '100%'}]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onBlur={onBlur}
          onFocus={onFocus}
          cursorColor={Colors.socialPink}
        />
      </View>

      {showRightIcon && (
        <TouchableOpacity
          style={[styles.gradient]}
          onPress={toggleShowPassword}>
          {useGradient ? (
            <LinearGradient
              colors={Colors.gradient}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              locations={[0, 0.25, 0.6]}
              style={styles.textInputIconWrapperGradient}>
              {children}
            </LinearGradient>
          ) : (
            children
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    backgroundColor: Colors.darkGray,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputInnerWrapper: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    // backgroundColor: 'violet',
  },
  preIconWrapper: {
    width: '15%',
    height: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  input: {
    height: '100%',
    width: '85%',
    paddingLeft: 20,
    fontSize: 12,
    color: Colors.socialWhite,
    fontFamily: 'Roboto-Medium',
    // backgroundColor: 'green',
  },
  gradient: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  textInputIconWrapperGradient: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
