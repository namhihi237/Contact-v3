/**
 * a' Event - Event Manager App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import SCREENS from './screen/Screen';

const App = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene {...SCREENS.Main} initial />
        <Scene {...SCREENS.addContact} />
        <Scene {...SCREENS.editContact} />
      </Stack>
    </Router>
  );
};
export default App;
