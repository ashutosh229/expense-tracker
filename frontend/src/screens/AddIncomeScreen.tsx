import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import {StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  AddIncome: undefined;
};

type AddIncomeScreenProps = StackScreenProps<RootStackParamList, 'AddIncome'>;

export default function AddIncomeScreen({navigation}: AddIncomeScreenProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/income', {
        amount: parseFloat(amount),
        description,
      });
      Alert.alert('Success', 'Income added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add income');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Amount"
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput placeholder="Description" onChangeText={setDescription} />
      <Button title="Add Income" onPress={handleSubmit} />
    </View>
  );
}
