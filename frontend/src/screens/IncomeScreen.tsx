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

const API_BASE_URL = `${process.env.BACKEND_DOMAIN}/api/income`;

type Income = {
  id: number;
  description: string;
  amount: number;
  type: string;
  included_in_total: boolean;
};

const IncomeScreen = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [includedInTotal, setIncludedInTotal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      if (response.data.success) {
        setIncomes(response.data.data);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching incomes:', error);
    }
  };

  const handleAddIncome = async () => {
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
        setIncomes([...incomes, response.data.data]);
        setDescription('');
        setAmount('');
        setType('');
        setIncludedInTotal(true);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error adding income:', error);
    }
  };

  const handleUpdateIncome = async () => {
    if (!editingIncome) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/${editingIncome.id}`, {
        description,
        amount: parseFloat(amount),
        type,
        included_in_total: includedInTotal,
      });

      if (response.data.success) {
        setIncomes(
          incomes.map(income =>
            income.id === editingIncome.id ? response.data.data : income,
          ),
        );
        setModalVisible(false);
        setEditingIncome(undefined);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error updating income:', error);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.data.success) {
        setIncomes(incomes.filter(income => income.id !== id));
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error deleting income:', error);
    }
  };

  return (
    <Layout>
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
        <Text style={styles.title}>Income Tracker</Text>

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
            placeholder="Type (Salary, Bonus, etc.)"
            value={type}
            onChangeText={setType}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity onPress={handleAddIncome} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Income</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={incomes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.incomeItem}>
              <Text style={styles.incomeText}>{item.description}</Text>
              <Text style={styles.incomeAmount}>₹{item.amount}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingIncome(item);
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
                  onPress={() => handleDeleteIncome(item.id)}
                  style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Edit Income Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Type"
                value={type}
                onChangeText={setType}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={handleUpdateIncome}
                style={styles.addButton}>
                <Text style={styles.buttonText}>Update Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#00c6ff',
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
  editButton: {
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 10,
  },
  incomeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  incomeText: {
    fontSize: 18,
    color: '#fff',
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#777',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default IncomeScreen;
