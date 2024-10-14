import {Colors, Dim} from '@constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MealStack} from '@routes/Meal/Meal';

import Profile from '@screens/user/Profile';
import Rent from '@screens/user/Rent';
import Utilities from '@screens/user/Utilities';
import {Image, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function UserRouter() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: Colors.lime,
        tabBarInactiveTintColor: Colors.socialWhite,
        tabBarInactiveBackgroundColor: Colors.darkBlack,
      }}>
      <Tab.Screen
        name="meal"
        component={MealStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Image
                source={require('@assets/images/restaurant.png')}
                style={{
                  height: 23,
                  width: 23,
                }}
                resizeMode="contain"
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="rent"
        component={Rent}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Image
                source={require('@assets/images/rent.png')}
                style={{
                  height: 23,
                  width: 23,
                }}
                resizeMode="contain"
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="utilities"
        component={Utilities}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <Image
                source={require('@assets/images/utilities.png')}
                style={{
                  height: 23,
                  width: 23,
                }}
                resizeMode="contain"
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused}) => {
            return <FontAwesome name="user-circle" size={23} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
