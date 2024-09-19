import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import TextInput from '@components/common/AppTextInput';
import {Colors, Dim} from '@constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '@components/common/Button';
import {useNavigation} from '@react-navigation/native';
import LogoItem from '@components/common/logoItem';

export default function SignUp() {
  const navigation = useNavigation();

  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <View style={styles.signup}>
      <LogoItem style={{marginBottom: 30}} />

      <TextInput
        onBlur={() => {}}
        placeholder="Enter your email"
        placeholderTextColor={Colors.lighterGray}
        onFocus={() => {}}
        onChangeText={() => {}}
        showRightIcon={false}
        style={{
          width: Dim.width * 0.73,
        }}
        preIcon={<Ionicons name="mail" size={18} color={Colors.lighterGray} />}
      />

      <TextInput
        showPassword={showPass}
        onBlur={() => {}}
        placeholder="Enter new password"
        placeholderTextColor={Colors.lighterGray}
        onFocus={() => {}}
        onChangeText={() => {}}
        toggleShowPassword={() => {
          setShowPass(!showPass);
        }}
        style={{
          marginTop: 20,
          width: Dim.width * 0.73,
        }}
        preIcon={
          <Foundation name="key" size={18} color={Colors.lighterGray} />
        }>
        {showPass ? (
          <Ionicons name="eye-off" color={Colors.socialWhite} size={20} />
        ) : (
          <Ionicons name="eye" color={Colors.socialWhite} size={20} />
        )}
      </TextInput>

      <TextInput
        showPassword={showPass}
        onBlur={() => {}}
        placeholder="Confirm new password"
        placeholderTextColor={Colors.lighterGray}
        onFocus={() => {}}
        onChangeText={() => {}}
        toggleShowPassword={() => {
          setShowPass(!showPass);
        }}
        style={{
          marginTop: 20,
          width: Dim.width * 0.73,
        }}
        preIcon={
          <Foundation name="key" size={18} color={Colors.lighterGray} />
        }>
        {showPass ? (
          <Ionicons name="eye-off" color={Colors.socialWhite} size={20} />
        ) : (
          <Ionicons name="eye" color={Colors.socialWhite} size={20} />
        )}
      </TextInput>

      <Button
        width={Dim.width * 0.7}
        title="Sign up"
        buttonStyle={{
          marginTop: 20,
        }}
        titleStyle={{}}
        onPress={() => {
          console.log('sign up');
        }}
      />

      <Pressable
        style={styles.backButton}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}>
        <MaterialIcons name="arrow-back" size={20} color={Colors.lighterGray} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlack,
    position: 'relative',
  },
  backButton: {
    height: 40,
    width: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 30,
    left: Dim.width * 0.15 - 15,
  },
});
