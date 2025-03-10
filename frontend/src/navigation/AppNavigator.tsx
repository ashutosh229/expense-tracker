import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import LoginScreen from '../screens/LoginScreen';
// import AboutScreen from '../screens/AboutScreen';
// import ContactScreen from '../screens/ContactScreen';
// import StatisticsScreen from '../screens/StatisticsScreen';
// import IncomeScreen from '../screens/IncomeScreen';
// import ExpenseScreen from '../screens/ExpenseScreen';
// import DuesScreen from '../screens/DuesScreen';
// import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide default header, we use our custom header
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
        <Stack.Screen name="Income" component={IncomeScreen} />
        <Stack.Screen name="Expense" component={ExpenseScreen} />
        <Stack.Screen name="Dues" component={DuesScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
