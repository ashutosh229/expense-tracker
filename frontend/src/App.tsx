import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import AddIncomeScreen from './screens/AddIncomeScreen';
import EditExpenseScreen from './screens/EditExpenseScreen';
import EditIncomeScreen from './screens/EditIncomeScreen';
import FilterScreen from './screens/FilterScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import {useAuth} from './hooks/useAuth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  EditExpense: {
    expense: {
      id: string;
      amount: number;
      description: string;
    };
  };
  AddIncome: undefined;
  EditIncome: {
    income: {
      id: string;
      amount: number;
      description: string;
    };
  };
  Filter: undefined;
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const {userToken} = useAuth();

  return (
    <Stack.Navigator>
      {userToken ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
          <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
          <Stack.Screen name="EditIncome" component={EditIncomeScreen} />
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
