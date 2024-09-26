import {View, Text, Pressable, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import {Dim} from '@constants';

import Entypo from 'react-native-vector-icons/Entypo';
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
        <Entypo name="chevron-thin-left" size={20} color={'#fff'} />
      </Pressable>
      <View style={styles.headerTitleWrapper}>
        <AppText styles={titleStyle}>{title}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backbutton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrapper: {
    height: 50,
    flexDirection: 'row',
    // backgroundColor: 'green',
    width: Dim.width,
    paddingLeft: Dim.width * 0.075 - 15,
    alignSelf: 'center',
    marginBottom: 25,
  },
  headerTitleWrapper: {
    width: Dim.width * 0.85 - 70,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
