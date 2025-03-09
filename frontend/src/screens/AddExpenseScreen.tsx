import React, {useState} from 'react';
import {View, Text, TextInput, Button, Switch, Alert} from 'react-native';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type AddExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddExpense'
>;

export default function AddExpenseScreen({navigation}: AddExpenseScreenProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [included, setIncluded] = useState(false);

  const handleAddExpense = async () => {
    if (!amount || !description || !type) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/expenses', {
        amount: parseFloat(amount),
        description,
        type,
        included_in_total: included,
      });

      Alert.alert('Success', 'Expense added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    }
  };

  return (
    <View>
      <Text>Amount (₹):</Text>
      <TextInput
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text>Description:</Text>
      <TextInput value={description} onChangeText={setDescription} />

      <Text>Type:</Text>
      <TextInput value={type} onChangeText={setType} />

      <Text>Include in Total:</Text>
      <Switch value={included} onValueChange={setIncluded} />

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}
