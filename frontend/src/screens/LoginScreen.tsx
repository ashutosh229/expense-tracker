import React, {useState, useContext} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface AuthContextType {
  login: (token: string) => void;
}

export default function LoginScreen({navigation}: LoginScreenProps) {
  const authContext = useContext(AuthContext) as AuthContextType | null;

  if (!authContext) {
    throw new Error(
      'AuthContext is null. Ensure AuthProvider is wrapping the component tree.',
    );
  }
  const {login} = authContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {email, password},
      );
      login(response.data.token);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home');
    } catch (error) {
      const err = error as any;
      Alert.alert('Error', err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
