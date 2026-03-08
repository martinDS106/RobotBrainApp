/**
 * ROBOT BRAIN - Main App Entry Point
 * Cyberpunk Robot Controller Application
 */

import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/navigation';
import {CyberpunkColors} from './src/theme/colors';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={CyberpunkColors.deepCharcoal}
      />
      <Navigation />
    </>
  );
}

export default App;
