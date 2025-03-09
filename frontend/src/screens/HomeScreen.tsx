import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

export default function HomeScreen({navigation}) {
  const {logout} = useContext(AuthContext);
  const [summary, setSummary] = useState({totalExpenditure: 0});

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/expenses/summary')
      .then(res => setSummary(res.data));
  }, []);

  return (
    <View>
      <Text>Total Expenditure: ₹{summary.totalExpenditure}</Text>
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('Add Expense')}
      />
      <Button title="Filter" onPress={() => navigation.navigate('Filter')} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
