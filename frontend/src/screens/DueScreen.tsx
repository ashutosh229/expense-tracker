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

const API_BASE_URL = `${process.env.BACKEND_DOMAIN}/api/dues`;

type Due = {
  id: number;
  name: string;
  amount: number;
  description: string;
  type: string;
  settled: boolean;
};

const DuesScreen = () => {
  const [dues, setDues] = useState<Due[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [settled, setSettled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDue, setEditingDue] = useState<Due | undefined>(undefined);

  useEffect(() => {
    fetchDues();
  }, []);

  const fetchDues = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      if (response.data.success) {
        setDues(response.data.data);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching dues:', error);
    }
  };

  const handleAddDue = async () => {
    if (!name || !amount || !description || !type) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/`, {
        name,
        amount: parseFloat(amount),
        description,
        type,
        settled,
      });
      if (response.data.success) {
        setDues([...dues, response.data.data]);
        setName('');
        setAmount('');
        setDescription('');
        setType('');
        setSettled(false);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error adding due:', error);
    }
  };

  const handleDeleteDue = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.data.success) {
        setDues(dues.filter(due => due.id !== id));
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log('Error deleting due:', error);
    }
  };

  return (
    <Layout>
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
        <Text style={styles.title}>Dues Tracker</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
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
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Type (Loan, Borrowed, etc.)"
            value={type}
            onChangeText={setType}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity onPress={handleAddDue} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Due</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.dueItem}>
              <Text style={styles.dueText}>{item.name}</Text>
              <Text style={styles.dueAmount}>₹{item.amount}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleDeleteDue(item.id)}
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
    backgroundColor: '#6a11cb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
  },
  dueItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dueText: {fontSize: 18, color: '#fff'},
  dueAmount: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  actionButtons: {flexDirection: 'row', marginTop: 10},
  buttonText: {color: '#fff', fontWeight: 'bold'},
});

export default DuesScreen;
