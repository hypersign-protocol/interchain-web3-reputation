import { supportedChains } from './chains';
import { 
  getUserAddressFromOfflineSigner, 
  createClient,
  constructNFTMintMsg,
  constructQueryNFTTokensMsg,
  constructExecuteNFTTransfer,
  getPublicKeyMultibase,
  constructQueryReputationScore
} from './utils';
import { 
  smartContractExecuteRPC, 
  smartContractQueryRPC,
  smartContractCodeInstantiateRPC 
} from './smartContract';
import { buildTable, getNFTTokensData, getContractMetadata, populateActivities } from './elements';
import "./styles/style.css";
import { getActivities, getActivitiesById, getActivity1, getActivity2, getScore, performActivity } from './score';

// Load Osmosis Chain Config
// TODO: Make it dynamic using a drop down
const chain = "hypersignLocalnet"

const chainConfig = supportedChains[chain];
const chainId = chainConfig["chainId"];
const chainRPC = chainConfig["rpc"]
const chainCoinDenom = chainConfig["feeCurrencies"][0]["coinMinimalDenom"]

// Define HTML elements
let walletDidIdSpan = document.getElementById("keplrDidId");
let walletConnectButton = document.getElementById("WalletLogin");
let scoreRefreshBtn = document.getElementById("scoreRefreshBtn");
let cardParent = document.getElementById("cardParent");

// Global vars (Keplr)
let didId = ""
let activeSmartContractAddress = ""; // User Input Smart Contract Address
let offlineSigner = ""; // Keplr Signer
let signingClient = null;
let userAddress = "";

// Score
let didScore = document.getElementById("didScore");

// Activities
let activities = [];
let activitiesByDidId = [];
let activityIdx = null;

// Contract Addresses
const reputationEngineContractAddress = "hid1m2q842a5sr6tg0v2dpezzrgd3exvs03hwd2aftluqcfhqukary8qczxs7v";
const activityManagerContractAddress = "hid13g2vzgzdjax4d3gwd6xzh7axe4avt74u97xllthyr8qyc6rln0nq7yum2a"


// Load the address upon connecting the wallet
// and enable the input field to enter Smart Contract
walletConnectButton.onclick = async () => {
  if (!window.getOfflineSigner || !window.keplr) {
    alert("Please install keplr extension");
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain(
            chainConfig
        );
      } catch {
        alert("Failed to suggest the chain");
      }
    } else {
      alert("Please use the recent version of keplr extension");
    }
  }
  
  // Get the wallet address
  await window.keplr.enable(chainId);
  offlineSigner = window.getOfflineSigner(chainId)
  userAddress = await getUserAddressFromOfflineSigner(offlineSigner);
  console.log("User Address: ", userAddress)
  signingClient = await createClient(chainRPC, offlineSigner);

  // Append the didId
  let pubKeyMultibase = await getPublicKeyMultibase(chainId)
  didId = "did:hid:devnet:" + pubKeyMultibase;
  walletDidIdSpan.innerText = didId

  // Activities
  activities = await getActivities(signingClient, activityManagerContractAddress)
  activitiesByDidId = await getActivitiesById(signingClient, activityManagerContractAddress, didId)

  activityIdx = populateActivities(cardParent, activities, activitiesByDidId)

  // Get Score
  didScore.innerText = await getScore(signingClient, reputationEngineContractAddress, didId, activityManagerContractAddress)

  console.log("Wallet address " + userAddress + " is active")
  console.log("DID Id: ", didId)
};

// Refresh button to fetch score
scoreRefreshBtn.onclick = async () => {
  if (signingClient == null) {
    alert("Please connect your Keplr Wallet")
  } else {
    didScore.innerText = await getScore(signingClient, reputationEngineContractAddress, didId, activityManagerContractAddress)
  }
}

// Add event to all verify buttons
cardParent.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.classList.contains('activity-verify-btn')) {
    const idx = target.dataset.activityIndex;

    try {
      await performActivity(signingClient, userAddress, activityManagerContractAddress, didId, activityIdx[idx]);

      target.innerText = 'Done';
      target.disabled = true;
    } catch (error) {
      alert(error)
    }
  }
})
