import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import axios from 'axios';

export default function SignupScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          name,
          email,
          password,
        },
      );
      Alert.alert('Success', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <View>
      <Text>Signup</Text>
      <TextInput placeholder="Name" onChangeText={setName} />
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
      <Button title="Signup" onPress={handleSignup} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
