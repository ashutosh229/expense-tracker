import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Expense Tracker | Developed by YourName</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {backgroundColor: '#222', padding: 10, alignItems: 'center'},
  text: {color: 'white', fontSize: 14},
});

export default Footer;
