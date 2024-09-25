import {createStackNavigator} from '@react-navigation/stack';
import Meal from '@screens/meal/Meal';
import UpdateMeal from '@screens/meal/UpdateMeal';

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
