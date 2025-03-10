import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSidebar} from '../context/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isSidebarOpen} = useSidebar();

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.content, isSidebarOpen && styles.blurEffect]}>
        {children}
      </View>
      <Sidebar />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1, backgroundColor: 'white', padding: 10},
  blurEffect: {backgroundColor: 'rgba(0,0,0,0.4)'}, // Darkened background when sidebar opens
});

export default Layout;
