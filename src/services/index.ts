import Web3 from "web3";
import Onboard from "bnc-onboard";
import { addresses, abis } from "../config";
import BigNumber from "bignumber.js";
import Notify from "bnc-notify";

var notify = Notify({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
});

let web3: any;

const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
});

export const getAccount = async () => {
  await onboard.walletSelect();
  await onboard.walletCheck();
  const currentState = onboard.getState();

  return currentState.address;
};

export const disconnect = () => {
  onboard.walletReset();
};

export const contractVestingFactory = async () => {
  if (web3) {
    return new web3.eth.Contract(
      abis.argoVestingFactory,
      addresses.argoVestingFactory
    );
  } else return null;
};

export const contractArGoErc20 = async () => {
  if (web3) {
    return new web3.eth.Contract(abis.erc20, addresses.argoERC20);
  } else return null;
};

export const getVestingContract = async (address: string) => {
  if (web3) {
    return new web3.eth.Contract(abis.argoTokenVesting, address);
  } else return null;
};

export const contractSingleVesting = async () => {
  if (web3) {
    return new web3.eth.Contract(abis.erc20, addresses.argoERC20);
  } else return null;
};

export const getWhitelistDetails = async (address: string) => {
  const vestingFactoryContract = await contractVestingFactory();
  const whitelistDetails = await vestingFactoryContract.methods
    .whiteListedAddressMapping(address)
    .call();
  return whitelistDetails;
};

export const startVesting = async (wallet: string) => {
  const vestingFactoryContract = await contractVestingFactory();
  const vestTx = await vestingFactoryContract.methods
    .createVesting()
    .send({ from: wallet })
    .on("transactionHash", function (hash: string) {
      console.log(hash);
      notify.hash(hash);
    });
  return vestTx;
};

export const getVestingDetailsArray = async (address: string) => {
  var vesting = await getVestingContract(address);
  var listInfos = [];
  let i = 0;
  while (1) {
    try {
      var data = await vesting.methods.vestPeriodInfoArray(i).call();
      console.log(data);
      listInfos.push(data);
      i++;
    } catch (e) {
      break;
    }
  }
  return listInfos;
};

export const getTotalTokens = async (address: string) => {
  var vesting = await getVestingContract(address);
  if (vesting) {
    const totalBalance = await vesting.methods.totalBalance().call();
    console.log(totalBalance);
    return new BigNumber(totalBalance)
      .dividedBy(new BigNumber(10).pow(new BigNumber(18)))
      .toNumber();
  } else {
    return 0;
  }
};

export const getBeneficiary = async (address: string) => {
  var vesting = await getVestingContract(address);
  if (vesting) {
    const beneficiary = await vesting.methods.beneficiary().call();
    console.log(beneficiary);
    return beneficiary;
  } else {
    return "";
  }
};

export const unlockTokens = async (address: string, wallet: string) => {
  var vesting = await getVestingContract(address);
  if (vesting) {
    const release = await vesting.methods
      .release()
      .send({ from: wallet })
      .on("transactionHash", function (hash: string) {
        console.log(hash);
        notify.hash(hash);
      });
    console.log(release);
    return release;
  } else {
    return null;
  }
};
