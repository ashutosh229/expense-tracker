import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Layout from '../components/Layout';

const HomeScreen: React.FC = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Expense Tracker</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  welcome: {fontSize: 24, fontWeight: 'bold', color: '#333'},
});

export default HomeScreen;
