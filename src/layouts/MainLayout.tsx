import {Colors, Dim} from '@constants';
import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';

interface MainLayoutProps {
  children: React.ReactNode;
  noScroll: boolean;
}

export default function MainLayout({children, noScroll}: MainLayoutProps) {
  return noScroll ? (
    <View style={styles.mainLayout}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      {children}
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    paddingTop: 30,
    width: Dim.width,
    backgroundColor: '#000',
  },
  noScrollWrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlack,
  },
  scrollview: {
    paddingTop: 30,
    backgroundColor: '#000',
    paddingBottom: Dim.height * 0.2,
  },
});
