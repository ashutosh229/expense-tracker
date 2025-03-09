import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, Alert} from 'react-native';
import axios from 'axios';

export default function HomeScreen({navigation}) {
  const [summary, setSummary] = useState({totalExpenditure: 0, totalIncome: 0});
  const [income, setIncome] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchIncome();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get('http://localhost:5000/api/income/summary');
    setSummary(prev => ({...prev, totalIncome: res.data.totalIncome}));
  };

  const fetchIncome = async () => {
    const res = await axios.get('http://localhost:5000/api/income');
    setIncome(res.data);
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/income/${id}`);
      Alert.alert('Deleted', 'Income record removed successfully!');
      fetchIncome();
      fetchSummary();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete income record');
    }
  };

  return (
    <View>
      <Text>Total Income: ₹{summary.totalIncome}</Text>
      <Button
        title="Add Income"
        onPress={() => navigation.navigate('Add Income')}
      />
      <FlatList
        data={income}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.description} - ₹{item.amount}
            </Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('Edit Income', {income: item})}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteIncome(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
