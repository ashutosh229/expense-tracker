import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext, AuthProvider} from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import EditExpenseScreen from './screens/EditExpenseScreen';
import FilterScreen from './screens/FilterScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const {userToken} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {userToken ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Expense" component={AddExpenseScreen} />
          <Stack.Screen name="Edit Expense" component={EditExpenseScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
