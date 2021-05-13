import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import { StartVesting, Toolbar, VestingInfo } from "./components";

function App() {
  const [wallet, setWallet] = useState();

  return (
    <div className="App">
      <Toolbar setWallet={setWallet} wallet={wallet} />
      <Switch>
        <Route path="/" exact render={() => <StartVesting wallet={wallet} />} />
        <Route path="/vesting/:id" exact render={() => <VestingInfo wallet={wallet} />} />
      </Switch>
    </div>
  );
}

export default App;
