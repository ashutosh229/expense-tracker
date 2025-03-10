import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <TextInput
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.messageInput]}
          placeholderTextColor="#fff"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff7e5f',
  },
});

export default ContactUsScreen;
