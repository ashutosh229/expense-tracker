import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AboutUsScreen = () => {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to our platform! We aim to provide the best experience by
          combining technology and innovation.
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Our Mission</Text>
          <Text style={styles.sectionText}>
            Our goal is to revolutionize the way users interact with digital
            services through seamless design and robust functionality.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Our Vision</Text>
          <Text style={styles.sectionText}>
            To create a future where technology bridges gaps and enhances
            everyday life.
          </Text>
        </View>
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
  description: {
    fontSize: 18,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#e0e0e0',
  },
});

export default AboutUsScreen;
