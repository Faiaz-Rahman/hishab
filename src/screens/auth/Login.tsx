import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

import {Colors, Dim} from '@constants';
import TextInput from '@components/common/AppTextInput';
import Button from '@components/common/Button';
import AppText from '@components/common/Text';

import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <View style={styles.login}>
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
        placeholder="Enter password"
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
        title="Login"
        buttonStyle={{
          marginTop: 20,
        }}
        titleStyle={{}}
        onPress={() => {
          console.log('login');
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          height: 30,
          alignItems: 'center',
          marginTop: 10,
          gap: 5,
        }}>
        <AppText>Not a user? </AppText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('signup' as never);
          }}>
          <AppText styles={{textDecorationLine: 'underline'}}>Sign Up</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlack,
  },
});
