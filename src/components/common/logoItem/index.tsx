import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '@constants';

interface LogoItemProps {
  style?: Object;
}

export default function LogoItem({style}: LogoItemProps) {
  return (
    <View style={[styles.logoItem, style]}>
      <Image
        source={require('@assets/images/logo.png')}
        style={{
          height: 67,
          width: 67,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoItem: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lighterGray,
  },
});
