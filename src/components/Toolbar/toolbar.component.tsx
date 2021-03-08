import React from 'react';
import "./toolbar.styles.scss"

export default function Toolbar() {
    return (
        <div className="toolbar">
            <div className="toolbar-logo-container">
                <img src={require("../../assets/logo-colored.png").default} alt="logo" className="toolbar-logo"/> 
                <span className="toolbar-title">ArGo</span>
            </div>
            <div className="toolbar-wallet-container">
                <button type="button" className="metamask-connect">Connect</button>
            </div>
        </div>
    )
}