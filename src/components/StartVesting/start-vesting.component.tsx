import React, { useEffect, useState } from "react";
import { getWhitelistDetails, startVesting } from "../../services";
import "./start-vesting.styles.scss";
import BigNumber from "bignumber.js";
import { useHistory } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

const override = css`
    display: block;
    margin: 0px 0.5rem;
`;

export default function StartVesting({ wallet }: any) {
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployContractAddress, setDeployedContractAddress] = useState("");
  const [vestingLoading, setVestingLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (wallet) {
      console.log(wallet);
      startup();
    }
  }, [wallet]);

  const startup = async () => {
    const whiteListDetails = await getWhitelistDetails(wallet);
    console.log(whiteListDetails.amount);
    const amount = new BigNumber(whiteListDetails.amount);
    const withdrawn = whiteListDetails.withdrawn;
    console.log(whiteListDetails);

    if (amount.isGreaterThan(new BigNumber(0))) {
      setIsWhitelisted(true);
    }
    if (withdrawn) {
      setIsDeployed(true);
    } else {
      setIsDeployed(false);
    }
    setDeployedContractAddress(whiteListDetails.deployedVestingAddress);
  };

  const goToVestingScreen = () => {
    if (deployContractAddress) {
      history.push(`/vesting/${deployContractAddress}`);
    }
  };

  const createVesting = async () => {
    setVestingLoading(true);
    const vestTx = await startVesting();
    setVestingLoading(false);
    startup()
  };

  return (
    <div className="start-vesting">
      <div className="start-vesting-container">
        <div className="start-vesting-title">Welcome to ArGo</div>
        <div className="start-vesting-subtitle">ArGo Private Round Sale</div>
        {isWhitelisted ? (
          <>
            <div className="start-vesting-subtitle">
              Allocate $ARGO Token and start the Vesting process
            </div>
            <div className="start-vesting-button-container">
              {isDeployed ? (
                <button
                  className="start-vesting-button"
                  onClick={goToVestingScreen}
                >
                  Show Vesting Info
                </button>
              ) : (
                <button
                  className="start-vesting-button"
                  disabled={vestingLoading}
                  onClick={createVesting}
                >
                  {vestingLoading ? (
                    <BounceLoader
                      color={"#fff"}
                      css={override}
                      loading={vestingLoading}
                      size={24}
                    />
                  ) : (
                    "Start Vesting"
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="start-vesting-subtitle" style={{ marginTop: "2rem" }}>
            This wallet is not Whitelisted in private sale, please connect with
            wallet which sent for whitelisting to the ArGo Team
          </div>
        )}
      </div>
    </div>
  );
}
