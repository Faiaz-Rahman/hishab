import {createStackNavigator} from '@react-navigation/stack';
import AddNewExpense from '@screens/meal/AddNewExpense';
import AllExpenses from '@screens/meal/AllExpenses';
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
      <Stack.Screen name="new_expense" component={AddNewExpense} />
      <Stack.Screen name="all_expenses" component={AllExpenses} />
    </Stack.Navigator>
  );
};
