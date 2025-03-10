import {View, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import MainLayout from '@layouts/MainLayout';
import TextInput from '@components/common/AppTextInput';

import {Dim} from '@constants';
import moment from 'moment';
import Button from '@components/common/Button';
import {useDispatch, useSelector} from 'react-redux';
import {persistor, RootState} from '@store/index';

import auth from '@react-native-firebase/auth';
import {logout} from '@store/slices/authSlice';

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {userInfo} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const fetchUserDataFromFb = async () => {};

  const updateUserDataToFb = async () => {};

  const onPressLogout = async () => {
    setIsLoading(true);
    await auth().signOut();
    dispatch(logout({}));

    await persistor.purge();

    setIsLoading(false);
  };

  return (
    <MainLayout noScroll={false}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            height: 85,
            width: 85,
            borderRadius: 85,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Image
            source={require('@assets/images/user.png')}
            style={{
              height: 80,
              width: 80,
              resizeMode: 'contain',
            }}
          />
        </View>
        {/* <AppText>Profile</AppText> */}

        <View style={{marginTop: 30, gap: 15}}>
          <TextInput
            placeholder="Your first name ..."
            placeholderTextColor="gray"
            onChangeText={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            style={styles.textInputStyle}
          />

          <TextInput
            placeholder="Your last name ..."
            placeholderTextColor="gray"
            onChangeText={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            style={styles.textInputStyle}
          />

          <TextInput
            editable={false}
            placeholder="example@example.com"
            value={'testuser@gmail.com'}
            placeholderTextColor="gray"
            onChangeText={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            style={styles.textInputStyle}
          />

          <TextInput
            editable={false}
            placeholder="example@example.com"
            value={moment(new Date()).format('LL')}
            placeholderTextColor="gray"
            onChangeText={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            style={styles.textInputStyle}
          />

          <Button
            title="Save"
            disabled={isLoading}
            width={Dim.width * 0.8}
            buttonStyle={{height: 50, marginTop: 10}}
            onPress={() => {}}
          />

          <Button
            title="Log out"
            disabled={isLoading}
            width={Dim.width * 0.8}
            useGradient={false}
            buttonStyle={styles.logoutButtonWrapper}
            onPress={onPressLogout}
          />
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: Dim.width * 0.8,
    height: 50,
    borderRadius: 5,
  },
  logoutButtonWrapper: {
    height: 50,
    marginTop: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
