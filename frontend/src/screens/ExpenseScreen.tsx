import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Layout from '../components/Layout';

const API_BASE_URL = `${process.env.BACKEND_DOMAIN}/api/expenses`;

type Expense = {
  id: number;
  description: string;
  amount: number;
  type: string;
  included_in_total: boolean;
};

const ExpenseScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [includedInTotal, setIncludedInTotal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      if (response.data.success) {
        setExpenses(response.data.data);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async () => {
    if (!description || !amount || !type) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/`, {
        description,
        amount: parseFloat(amount),
        type,
        included_in_total: includedInTotal,
      });

      if (response.data.success) {
        setExpenses([...expenses, response.data.data]);
        setDescription('');
        setAmount('');
        setType('');
        setIncludedInTotal(true);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async () => {
    if (!editingExpense) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/${editingExpense.id}`, {
        description,
        amount: parseFloat(amount),
        type,
        included_in_total: includedInTotal,
      });

      if (response.data.success) {
        setExpenses(
          expenses.map(expense =>
            expense.id === editingExpense.id ? response.data.data : expense,
          ),
        );
        setModalVisible(false);
        setEditingExpense(undefined);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.data.success) {
        setExpenses(expenses.filter(expense => expense.id !== id));
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error deleting expense:', error);
    }
  };

  return (
    <Layout>
      <LinearGradient colors={['#ff6b6b', '#f06595']} style={styles.container}>
        <Text style={styles.title}>Expense Tracker</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Type (Food, Travel, etc.)"
            value={type}
            onChangeText={setType}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity onPress={handleAddExpense} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={expenses}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>{item.description}</Text>
              <Text style={styles.expenseAmount}>₹{item.amount}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingExpense(item);
                    setDescription(item.description);
                    setAmount(item.amount.toString());
                    setType(item.type);
                    setIncludedInTotal(item.included_in_total);
                    setModalVisible(true);
                  }}
                  style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteExpense(item.id)}
                  style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {marginBottom: 20},
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  editButton: {backgroundColor: '#ffa500', padding: 10, borderRadius: 10},
  expenseItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  expenseText: {fontSize: 18, color: '#fff'},
  expenseAmount: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  actionButtons: {flexDirection: 'row', marginTop: 10},
  buttonText: {color: '#fff', fontWeight: 'bold'},
});

export default ExpenseScreen;
