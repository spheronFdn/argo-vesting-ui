import React from 'react';
import './App.scss';
import { StartVesting, Toolbar, VestingInfo } from './components';

function App() {
  return (
    <div className="App">
      <Toolbar />
      {/* <StartVesting isConnected={true} /> */}
      <VestingInfo isConnected={true} />
    </div>
  );
}

export default App;
