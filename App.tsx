import Route from '@routes/index';
import Login from '@screens/auth/Login';
import store, {persistor} from '@store/index';
import React from 'react';

import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
