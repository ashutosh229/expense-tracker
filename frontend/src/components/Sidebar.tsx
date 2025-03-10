import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {useSidebar} from '../context/SidebarContext';
import {useNavigation} from '@react-navigation/native';

const Sidebar: React.FC = () => {
  const {isSidebarOpen, toggleSidebar} = useSidebar();
  const slideAnim = new Animated.Value(isSidebarOpen ? 0 : -250);
  const navigation = useNavigation();

  Animated.timing(slideAnim, {
    toValue: isSidebarOpen ? 0 : -250,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const navigateToScreen = (screen: string) => {
    toggleSidebar(); // Close sidebar
    navigation.navigate(screen as never); // Navigate to screen
  };

  const sidebarLinks = [
    'Register',
    'Login',
    'About Us',
    'Contact',
    'Statistics',
    'Income',
    'Expense',
    'Dues',
    'Payment',
  ];

  return (
    <>
      {isSidebarOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
      )}
      <Animated.View style={[styles.sidebar, {left: slideAnim}]}>
        {sidebarLinks.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.item}
            onPress={() => navigateToScreen(item)}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: -250,
    width: 250,
    height: '100%',
    backgroundColor: '#444',
    padding: 20,
  },
  item: {paddingVertical: 15, borderBottomColor: '#666', borderBottomWidth: 1},
  text: {color: 'white', fontSize: 18},
});

export default Sidebar;
