import React from "react";
import { useHistory } from "react-router-dom";
import { disconnect, getAccount } from "../../services";
import "./toolbar.styles.scss";

export default function Toolbar({ setWallet, wallet }: any) {
  const history = useHistory();
  const connectMetamask = async () => {
    if (wallet) {
      disconnect();
      setWallet();
    } else {
      const walletAddress = await getAccount();
      setWallet(walletAddress);
    }
  };

  let showButtonText = "Connect Wallet";

  if (wallet) {
    showButtonText = "Disconnect Wallet";
  }
  return (
    <div className="toolbar">
      <div
        className="toolbar-logo-container"
        onClick={(e) => history.push("/")}
      >
        <img
          src={require("../../assets/logo-colored.png").default}
          alt="logo"
          className="toolbar-logo"
        />
        <span className="toolbar-title">ArGo</span>
      </div>
      <div className="toolbar-wallet-container">
        <button
          type="button"
          className="metamask-connect"
          onClick={connectMetamask}
        >
          {showButtonText}
        </button>
      </div>
    </div>
  );
}
