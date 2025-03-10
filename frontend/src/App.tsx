import React from 'react';
import {SidebarProvider} from './context/SidebarContext';
import HomeScreen from './screens/HomeScreen';

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <HomeScreen />
    </SidebarProvider>
  );
};

export default App;
