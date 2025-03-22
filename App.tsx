import Route from '@routes/index';

import store, {persistor} from '@store/index';
import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  const onMessageReceived = async (message: any) => {
    console.log(JSON.parse(message.data.notifee));

    notifee.displayNotification({
      ...JSON.parse(message.data.notifee),
      icon: 'ic_launcher',
    });
  };

  React.useEffect(() => {
    async function requestPermission() {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        console.log('permission granted');
      } else {
        console.log('rejected the permission');
      }
    }

    requestPermission();

    const createNotificationChannel = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    };

    createNotificationChannel();

    const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);
    const unsubscribeBackgroundMessageHandler =
      messaging().setBackgroundMessageHandler(onMessageReceived);

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
}

export default App;
