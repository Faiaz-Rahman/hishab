import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Colors} from '@constants';

import {AuthRoute} from './auth';

import {useSelector} from 'react-redux';
import {RootState} from '@store/index';
import UserRouter from './user';
import Loader from '@screens/auth/Loader';

export default function Route() {
  const {isAuthenticated, authLoader} = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: Colors.pureBlack,
          card: Colors.pureBlack,
        },
      }}>
      {isAuthenticated ? (
        authLoader ? (
          <Loader />
        ) : (
          <UserRouter />
        )
      ) : (
        <AuthRoute />
      )}
    </NavigationContainer>
  );
}
