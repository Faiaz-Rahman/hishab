import Route from '@routes/index';

import store, {persistor} from '@store/index';
import React from 'react';

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

export default App;
