import React from 'react';
import {SidebarProvider} from './context/SidebarContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <AppNavigator></AppNavigator>
    </SidebarProvider>
  );
};

export default App;
