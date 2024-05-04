import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {AuthNavigation} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GlobelContex} from './src/component/context.tsx/Context';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GlobelContex>
          <AuthNavigation />
          <Toast />
        </GlobelContex>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
