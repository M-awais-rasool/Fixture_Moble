import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthNavigation } from './src/navigation';
import { SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthNavigation />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
