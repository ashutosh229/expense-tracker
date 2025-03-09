import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import axios from 'axios';

export default function FilterScreen() {
  const [type, setType] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [description, setDescription] = useState('');
  const [included, setIncluded] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleFilter = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/expenses/filter',
      {
        params: {type, minAmount, maxAmount, description, included},
      },
    );
    setFilteredResults(response.data);
  };

  return (
    <View>
      <TextInput placeholder="Type" onChangeText={setType} />
      <TextInput placeholder="Min Amount" onChangeText={setMinAmount} />
      <TextInput placeholder="Max Amount" onChangeText={setMaxAmount} />
      <TextInput placeholder="Description" onChangeText={setDescription} />
      <Button title="Apply Filters" onPress={handleFilter} />
      <FlatList
        data={filteredResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Text>
            {item.description} - ₹{item.amount}
          </Text>
        )}
      />
    </View>
  );
}
