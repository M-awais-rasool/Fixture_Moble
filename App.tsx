import React from 'react';
import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
}

export default App;
