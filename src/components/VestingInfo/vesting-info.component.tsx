import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBeneficiary,
  getTotalTokens,
  getVestingDetailsArray,
  unlockTokens,
} from "../../services";
import "./vesting-info.styles.scss";
import GridLoader from "react-spinners/GridLoader";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0px 0.5rem;
`;

export default function VestingInfo({ wallet }: any) {
  let { id }: { id: string } = useParams();

  const [beneficiary, setBeneficiary] = useState("");
  const [totalTokens, setTotalTokens] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [claimLoading, setClaimLoading] = useState(-1);
  const [vestingInfoList, setVestingInfoList] = useState<any[]>([]);

  useEffect(() => {
    if (wallet) {
      setDetailsLoading(true);
      getVestingDetails();
    } else {
      setIsOwner(false);
      setDetailsLoading(false);
    }
  }, [wallet]);

  const getVestingDetails = async () => {
    const beneficiary = await getBeneficiary(id);
    setBeneficiary(beneficiary);
    if (wallet.toLowerCase().indexOf(beneficiary.toLowerCase()) !== -1) {
      setIsOwner(true);
      const totalTokens = await getTotalTokens(id);
      setTotalTokens(totalTokens);
      const list = await getVestingDetailsArray(id);
      setVestingInfoList(list.sort((a, b) => +a.releaseTime - +b.releaseTime));
      setDetailsLoading(false);
    } else {
      setIsOwner(false);
      setDetailsLoading(false);
    }
  };

  const claimToken = async (i: number) => {
    setClaimLoading(i);
    try {
      const claimTx = await unlockTokens(id, wallet);
      console.log(claimTx);
      setClaimLoading(-1);
      setDetailsLoading(true);
      getVestingDetails();
    } catch (err) {
      console.log(err);
      setClaimLoading(-1);
      setDetailsLoading(true);
      getVestingDetails();
    }
  };

  return (
    <div className="vesting-info">
      <div className="vesting-title">Your $ARGO Vesting Info</div>
      {isOwner ? (
        !detailsLoading ? (
          <>
            <div className="vesting-details-container">
              <div className="vesting-detail-row">
                <span>Total $ARGO Token:</span>
                <span>{totalTokens}</span>
              </div>
              <div className="vesting-detail-row">
                <span>Beneficiary:</span>
                <span>
                  <a href={"https://etherscan.io/address/${beneficiary}"}>
                    {beneficiary}
                  </a>
                </span>
              </div>
              <div className="vesting-detail-row">
                <span>Contract Address:</span>
                <span>
                  <a href={`https://etherscan.io/address/${id}`}>{id}</a>
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
                {vestingInfoList.map((v, i) => {
                  const amount = (totalTokens * +v.percent) / 100;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{amount}</td>
                      <td>{v.percent}%</td>
                      <td>
                        {moment
                          .unix(+v.releaseTime)
                          .format("DD MMM YYYY hh:mm:ss")}
                      </td>
                      <td>
                        {!v.released ? (
                          <button
                            type="button"
                            disabled={
                              !wallet ||
                              moment.unix(+v.releaseTime).isAfter(moment())
                            }
                            className="claim-button"
                            onClick={(e) => claimToken(i)}
                          >
                            {claimLoading === i ? (
                              <span>
                                <BounceLoader
                                  color={"#fff"}
                                  loading={claimLoading === i}
                                  css={override}
                                  size={12}
                                />
                              </span>
                            ) : (
                              "Claim"
                            )}
                          </button>
                        ) : (
                          <span className="vesting-claimed">Claimed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="owner-not-found">
            <GridLoader color={"#3463ae"} loading={detailsLoading} size={40} />
          </div>
        )
      ) : (
        <div className="owner-not-found">
          You can't view this vesting detail since you are not the owner of this
          contract
        </div>
      )}
    </div>
  );
}
