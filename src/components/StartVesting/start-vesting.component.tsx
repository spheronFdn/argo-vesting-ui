import React from "react";
import "./start-vesting.styles.scss";

export default function StartVesting({ isConnected }: any) {
  return (
    <div className="start-vesting">
      <div className="start-vesting-container">
        <div className="start-vesting-title">Welcome to ArGo</div>
        <div className="start-vesting-subtitle">ArGo Private Round Sale</div>
        <div className="start-vesting-subtitle">Allocate $ARGO Token and start the Vesting process</div>
        <div className="start-vesting-button-container">
          {!isConnected ? (
            <button className="metamask-button">Connect</button>
          ) : (
            <button className="start-vesting-button">Start Vesting</button>
          )}
        </div>
      </div>
    </div>
  );
}
