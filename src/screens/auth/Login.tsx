import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

import {Colors, Dim} from '@constants';
import TextInput from '@components/common/AppTextInput';
import Button from '@components/common/Button';
import AppText from '@components/common/Text';

import {useNavigation} from '@react-navigation/native';
import LogoItem from '@components/common/logoItem';

import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@store/index';
import {
  login,
  updateAuthLoader,
  updateIsAuthenticated,
} from '@store/slices/authSlice';

export default function Login() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {isAuthenticated} = useSelector(state => (state as RootState).auth);
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   console.log(isAuthenticated);
  // }, [isAuthenticated]);
  const onPressLogin = async () => {
    if (!email || !password) {
      ToastAndroid.showWithGravity('Fill up the data first!', 1500, 10);
    } else {
      try {
        await dispatch(login({email: email, password: password}))
          .unwrap()
          .then(() => {
            setTimeout(() => {
              dispatch(updateAuthLoader(false));
            }, 2500);
          });
      } catch (error: any) {
        ToastAndroid.showWithGravity(error, 1500, 10);
        // console.log('error in login =>', error);
      }
    }
  };

  return (
    <View style={styles.login}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <LogoItem style={{marginBottom: 30}} />
      <TextInput
        onBlur={() => {}}
        placeholder="Enter your email"
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
        placeholder="Enter password"
        placeholderTextColor={Colors.lighterGray}
        showRightIcon={true}
        onFocus={() => {}}
        onChangeText={text => setPassword(text)}
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
        onPress={onPressLogin}
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
    backgroundColor: '#000',
  },
});
