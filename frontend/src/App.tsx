import React from 'react';
import {SidebarProvider} from './context/SidebarContext';
import AppNavigator from './navigation/AppNavigator';
import {AuthProvider} from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppNavigator></AppNavigator>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;
