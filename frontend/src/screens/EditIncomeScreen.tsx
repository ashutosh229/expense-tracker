import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';

export default function EditIncomeScreen({route, navigation}) {
  const {income} = route.params;
  const [amount, setAmount] = useState(income.amount.toString());
  const [description, setDescription] = useState(income.description);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/income/${income.id}`, {
        amount: parseFloat(amount),
        description,
      });
      Alert.alert('Success', 'Income updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update income');
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
      <Button title="Update Income" onPress={handleUpdate} />
    </View>
  );
}
