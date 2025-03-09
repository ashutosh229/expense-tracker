import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface Summary {
  totalIncome: number;
  totalExpenditure: number;
  totalSavings: number;
  excludedIncome: number;
  excludedExpenditure: number;
}

export default function HomeScreen({navigation}: HomeScreenProps) {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenditure: 0,
    totalSavings: 0,
    excludedIncome: 0,
    excludedExpenditure: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get<Summary>('http://localhost:5000/api/summary');
      setSummary(res.data);
    } catch (error) {
      console.error('Failed to fetch summary', error);
    }
  };

  return (
    <View>
      <Text>Total Income: ₹{summary.totalIncome}</Text>
      <Text>Total Expenditure: ₹{summary.totalExpenditure}</Text>
      <Text>Total Savings: ₹{summary.totalSavings}</Text>
      <Text>Excluded Income: ₹{summary.excludedIncome}</Text>
      <Text>Excluded Expenditure: ₹{summary.excludedExpenditure}</Text>

      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('AddExpense')}
      />
      <Button
        title="Add Income"
        onPress={() => navigation.navigate('AddIncome')}
      />
    </View>
  );
}
