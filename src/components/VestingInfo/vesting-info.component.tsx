import React from "react";
import "./vesting-info.styles.scss";

export default function VestingInfo({isConnected}: any) {
  return (
    <div className="vesting-info">
      <div className="vesting-title">Your $ARGO Vesting Info</div>
      <div className="vesting-details-container">
        <div className="vesting-detail-row">
          <span>Total $ARGO Token:</span>
          <span>1.2M</span>
        </div>
        <div className="vesting-detail-row">
          <span>Beneficiary:</span>
          <span>0x121212121</span>
        </div>
        <div className="vesting-detail-row">
          <span>Contract Address:</span>
          <span>
            <a href="https://etherscan.io/address/0x18738290af1aaf96f0acfa945c9c31ab21cd65be">
              0x18738290af1aaf96f0acfa945c9c31ab21cd65be
            </a>
          </span>
        </div>
      </div>
      <table className="vesting-detail-table">
        <thead>
          <tr>
            <th></th>
            <th>Token Amount</th>
            <th>Percentage</th>
            <th>Release Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              {/* <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button> */}
              <span className="vesting-claimed">Claimed</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              {/* <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button> */}
              <span className="vesting-claimed">Claimed</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>120000</td>
            <td>1.2%</td>
            <td>3 March 2021</td>
            <td>
              <button type="button" disabled={!isConnected} className="claim-button">
                Claim
              </button>
              {/* <span className="vesting-claimed">Claimed</span> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
