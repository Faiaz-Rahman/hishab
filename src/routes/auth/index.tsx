import {createStackNavigator} from '@react-navigation/stack';
import Loader from '@screens/auth/Loader';
import Login from '@screens/auth/Login';
import SignUp from '@screens/auth/SignUp';

const Stack = createStackNavigator();

const AuthRoute = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="loader" component={Loader} />
    </Stack.Navigator>
  );
};

export {AuthRoute};
