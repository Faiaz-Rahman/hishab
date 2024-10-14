import React from 'react';
import {ViewStyle} from 'react-native';

export interface MainLayoutProps {
  children: React.ReactNode;
  noScroll: boolean;
  floatingButton?: boolean;
  floatingButtonComponent?: React.ReactNode;
  floatingButtonOnPress?: () => void;
}

export interface CustomModalType {
  visible?: boolean;
  onRequestClose?: () => void;
  headerText?: string;
  headerIcon?: React.ReactNode;
  title: string;
  onPressNo?: () => void;
  onPressYes?: () => void;
}

export interface AppTextInputProps {
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
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'phone-pad'
    | 'url'
    | 'email-address';
}

export interface ButtonProps {
  width: number;
  title: string;
  buttonStyle?: ViewStyle;
  titleStyle?: Object;
  onPress: () => void;
}
