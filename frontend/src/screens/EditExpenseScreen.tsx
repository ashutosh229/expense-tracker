import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import {StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  EditExpense: {
    expense: {
      id: string;
      amount: number;
      description: string;
    };
  };
};

type EditExpenseScreenProps = StackScreenProps<
  RootStackParamList,
  'EditExpense'
>;

export default function EditExpenseScreen({
  route,
  navigation,
}: EditExpenseScreenProps) {
  const {expense} = route.params;
  const [amount, setAmount] = useState(expense.amount.toString());
  const [description, setDescription] = useState(expense.description);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${expense.id}`, {
        amount: parseFloat(amount),
        description,
      });
      Alert.alert('Success', 'Expense updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update expense');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update Expense" onPress={handleUpdate} />
    </View>
  );
}
