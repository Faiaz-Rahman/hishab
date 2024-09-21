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

type RedirectButtonProps = {
  extraStyle?: Object;
  title: string;
  onPress: () => void;
};

export default function RedirectButton({
  extraStyle,
  onPress,
  title,
}: RedirectButtonProps) {
  return (
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
