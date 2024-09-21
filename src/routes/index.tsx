import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthRoute} from './auth';

import {useSelector} from 'react-redux';
import {RootState} from '@store/index';
import UserRouter from './user';

export default function Route() {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? <UserRouter /> : <AuthRoute />}
    </NavigationContainer>
  );
}
