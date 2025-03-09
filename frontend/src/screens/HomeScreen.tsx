import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default function HomeScreen({navigation}) {
  const [summary, setSummary] = useState({totalExpenditure: 0});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchExpenses();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get('http://localhost:5000/api/expenses/summary');
    setSummary(res.data);
  };

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:5000/api/expenses');
    setExpenses(res.data);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      Alert.alert('Deleted', 'Expense removed successfully!');
      fetchExpenses();
      fetchSummary();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete expense');
    }
  };

  return (
    <View>
      <Text>Total Expenditure: ₹{summary.totalExpenditure}</Text>
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('Add Expense')}
      />
      <Button title="Filter" onPress={() => navigation.navigate('Filter')} />
      <FlatList
        data={expenses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.description} - ₹{item.amount}
            </Text>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate('Edit Expense', {expense: item})
              }
            />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
