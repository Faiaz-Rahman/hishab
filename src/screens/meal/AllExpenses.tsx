import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '@layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import Header from '@components/common/Header';

import AllExpenseComponent from '@components/common/AllExpenseComponent';

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
                navigation.navigate('detailed_expenses' as never);
                // setShowModal(true);
              }}>
              <Image
                source={require('@assets/images/user1.png')}
                style={styles.userImage}
              />
            </AllExpenseComponent>
          );
        })}
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    resizeMode: 'contain',
  },
});
