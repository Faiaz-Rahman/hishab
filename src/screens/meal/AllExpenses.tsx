import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '@layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import Header from '@components/common/Header';

import AllExpenseComponent from '@components/AllExpenseComponent';
import CustomModal from '@components/ui/Modal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '@constants';

export default function AllExpenses() {
  const navigation = useNavigation();
  const userData: number[] = [1, 2, 3, 4, 5, 6];
  const [showModal, setShowModal] = useState<boolean>(false);

  const onRequestClose = () => {
    setShowModal(false);
  };

  return (
    <MainLayout noScroll={false}>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title="All Expenses"
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Roboto-Medium',
        }}
      />
      {/* <CustomModal
        onRequestClose={onRequestClose}
        visible={showModal}
        headerText="Attention"
        headerIcon={<Ionicons name="warning" size={20} color={Colors.lime} />}
        title="Are you sure?"
      /> */}
      <View style={{gap: 25}}>
        {userData.map((item, index) => {
          return (
            <AllExpenseComponent
              key={`expenseComponent${index}`}
              totalAmount={460}
              username="Muhammad Fiaz"
              onPress={() => {
                console.log('privyet!');
                // setShowModal(true);
              }}>
              <Image
                source={require('@assets/images/user1.png')}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  resizeMode: 'contain',
                }}
              />
            </AllExpenseComponent>
          );
        })}
      </View>
    </MainLayout>
  );
}
