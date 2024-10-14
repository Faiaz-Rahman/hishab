import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';
import AppText from '@components/common/Text';

export default function Rent() {
  return (
    <MainLayout noScroll={false}>
      <AppText>Rent</AppText>
    </MainLayout>
  );
}
