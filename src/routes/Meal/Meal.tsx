import {createStackNavigator} from '@react-navigation/stack';
import Meal from '@screens/user/Meal';
import UpdateMeal from '@screens/user/UpdateMeal';

const Stack = createStackNavigator();

export const MealStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="meal_stack" component={Meal} />
      <Stack.Screen name="update_meal" component={UpdateMeal} />
    </Stack.Navigator>
  );
};
