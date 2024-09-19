import Route from '@routes/index';
import Login from '@screens/auth/Login';
import store from '@store/index';
import React from 'react';

import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
