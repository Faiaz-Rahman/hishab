import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';

import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Colors} from '@constants';
import {AppTextInputProps} from '@interfaces/*';

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
  editable = true,
  showRightIcon = false,
  toggleShowPassword,
  showPassword = true,
  keyboardType,
  value,
}: AppTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const focusProgress = useSharedValue(0);
  const focusStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusProgress.value,
      [0, 1],
      [Colors.cardBorder, Colors.lime],
    ),
    transform: [{translateY: withTiming(focusProgress.value ? -2 : 0, {duration: 160})}],
  }));

  const handleFocus = () => {
    setIsFocused(true);
    focusProgress.value = withTiming(1, {duration: 180});
    onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, {duration: 180});
    onBlur();
  };

  return (
    <Animated.View style={[styles.inputWrapper, style, focusStyle]}>
      <View
        style={[
          styles.inputInnerWrapper,
          showRightIcon ? styles.inputWithAction : styles.inputFull,
        ]}>
        {preIcon && <View style={styles.preIconWrapper}>{preIcon}</View>}
        <RNTextInput
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={showPassword ? false : true}
          onChangeText={onChangeText}
          style={[
            styles.input,
            preIcon ? styles.inputWithLeadingIcon : styles.inputWithoutLeadingIcon,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onBlur={handleBlur}
          onFocus={handleFocus}
          cursorColor={Colors.lime}
          editable={editable}
          value={value}
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
      {isFocused && <View pointerEvents="none" style={styles.focusDot} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    backgroundColor: '#1B1F27',
    height: 56,
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 3,
  },
  inputInnerWrapper: {
    height: '100%',
    flexDirection: 'row',
    // backgroundColor: 'violet',
  },
  inputWithAction: {flex: 1},
  inputFull: {width: '100%'},
  preIconWrapper: {
    width: '18%',
    height: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  input: {
    height: '100%',
    paddingLeft: 14,
    fontSize: 13,
    color: Colors.socialWhite,
    fontFamily: 'Poppins-Medium',
    // backgroundColor: 'green',
  },
  inputWithLeadingIcon: {flex: 1},
  inputWithoutLeadingIcon: {width: '100%'},
  gradient: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  textInputIconWrapperGradient: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  focusDot: {position: 'absolute', height: 5, width: 5, borderRadius: 3, backgroundColor: Colors.lime, right: 14, bottom: 7},
});
