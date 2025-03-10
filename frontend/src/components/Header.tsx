import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSidebar} from '../context/SidebarContext';

const Header: React.FC = () => {
  const {toggleSidebar} = useSidebar();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tracker</Text>
      <TouchableOpacity onPress={toggleSidebar} style={styles.hamburger}>
        <Text style={styles.hamburgerIcon}>☰</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#333',
  },
  title: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  hamburger: {padding: 5},
  hamburgerIcon: {color: 'white', fontSize: 26},
});

export default Header;
