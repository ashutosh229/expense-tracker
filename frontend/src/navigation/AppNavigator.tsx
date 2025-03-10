import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import {AuthContext, useAuth} from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import {ActivityIndicator, View} from 'react-native';
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import IncomeScreen from '../screens/IncomeScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import SummaryScreen from '../screens/SummaryScreen';
import DuesScreen from '../screens/DueScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    return (
      <LoadingScreen message="Initializing Authentication..."></LoadingScreen>
    );
  }

  const {user, loading} = auth;

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide default header, we use our custom header
        }}>
        {/* public screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="About Us" component={AboutUsScreen}></Stack.Screen>
        <Stack.Screen
          name="Contact Us"
          component={ContactUsScreen}></Stack.Screen>
        <Stack.Screen name="Loading" component={LoadingScreen}></Stack.Screen>
        {/* protected screens */}
        {user ? (
          <>
            <Stack.Screen name="Income" component={IncomeScreen}></Stack.Screen>
            <Stack.Screen
              name="Expense"
              component={ExpenseScreen}></Stack.Screen>
            <Stack.Screen
              name="Statistics"
              component={SummaryScreen}></Stack.Screen>
            <Stack.Screen name="Dues" component={DuesScreen}></Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Loading" component={LoadingScreen}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
