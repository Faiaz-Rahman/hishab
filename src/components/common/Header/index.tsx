import {View, Pressable, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import {Colors, Dim} from '@constants';

import Entypo from '@react-native-vector-icons/entypo';
import AppText from '../Text';

interface HeaderProps {
  onPressBackButton: () => void;
  title?: string;
  titleStyle?: TextStyle;
}

export default function Header({
  onPressBackButton,
  title,
  titleStyle,
}: HeaderProps) {
  return (
    <View style={styles.headerWrapper}>
      <Pressable onPress={onPressBackButton} style={styles.backbutton}>
        <Entypo name="chevron-thin-left" size={20} color={Colors.socialWhite} />
      </Pressable>
      <View style={styles.headerTitleWrapper}>
        <AppText styles={titleStyle}>{title}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backbutton: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 14,
    backgroundColor: Colors.socialBlack,
  },
  headerWrapper: {
    height: 42,
    flexDirection: 'row',
    // backgroundColor: 'green',
    width: Dim.width,
    paddingLeft: Dim.width * 0.075 - 15,
    alignSelf: 'center',
    marginBottom: 24,
  },
  headerTitleWrapper: {
    width: Dim.width * 0.85 - 56,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
