import {View, StyleSheet, Pressable, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import TextInput from '@components/common/AppTextInput';
import {Colors, Dim} from '@constants';

import Ionicons from '@react-native-vector-icons/ionicons';
import Foundation from '@react-native-vector-icons/foundation';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import Button from '@components/common/Button';
import {useNavigation} from '@react-navigation/native';
import LogoItem from '@components/common/logoItem';
import {useAppDispatch} from '@store/index';
import {signup, updateUserInfo} from '@store/slices/authSlice';

import MaterialCommunityIcons from '@react-native-vector-icons/material-icons';

import firebase from '@react-native-firebase/firestore';

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [confPass, setConfPass] = useState<string>('');

  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignup = async () => {
    setLoading(true);
    dispatch(signup({name, email, pass}))
      .unwrap()
      .then(userData => {
        firebase().collection('users').doc(userData?.uid).set({
          name,
          email,
          createdAt: new Date().toDateString(),
          fcm: '',
          role: 'treasurer',
        });

        if (userData) {
          dispatch(
            updateUserInfo({
              displayName: userData?.displayName,
              email: userData?.email,
              photoUrl: userData?.photoURL,
              uid: userData?.uid,
            }),
          );
        }

        setLoading(false);
      });
  };

  return (
    <View style={styles.signup}>
      <LogoItem style={{marginBottom: 30}} />

      <TextInput
        onBlur={() => {}}
        placeholder="e.g. Atiqul Halal, ... "
        placeholderTextColor={Colors.lighterGray}
        onFocus={() => {}}
        onChangeText={text => setName(text)}
        showRightIcon={false}
        style={{
          width: Dim.width * 0.73,
          marginBottom: 20,
        }}
        preIcon={
          <MaterialCommunityIcons
            name="format-overline"
            size={18}
            color={Colors.lighterGray}
          />
        }
      />

      <TextInput
        onBlur={() => {}}
        placeholder="e.g. halal@example.com, ..."
        placeholderTextColor={Colors.lighterGray}
        onFocus={() => {}}
        onChangeText={text => setEmail(text)}
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
        onChangeText={text => setPass(text)}
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
        onChangeText={text => setConfPass(text)}
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
        width={Dim.width * 0.73}
        title="Sign up"
        disabled={loading}
        useGradient={false}
        gradientBorder
        buttonStyle={{
          marginTop: 20,
        }}
        titleStyle={{color: Colors.lime}}
        onPress={() => {
          if (!email || !pass || !confPass || !name) {
            ToastAndroid.showWithGravity('Fill up the data first!', 1500, 10);
          } else if (pass != confPass) {
            ToastAndroid.showWithGravity('Passwords do not match!', 1500, 10);
          } else {
            onSignup();
          }
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
    backgroundColor: '#000',
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
