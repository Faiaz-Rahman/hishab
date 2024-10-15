import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function Loader() {
  return (
    <View style={styles.loader}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <LottieView
        source={require('@assets/images/loader.json')}
        style={{width: '100%', height: '100%'}}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
