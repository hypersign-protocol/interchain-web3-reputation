import { supportedChains } from './chains';
import {
  getUserAddressFromOfflineSigner,
  createClient,
  constructNFTMintMsg,
  constructQueryNFTTokensMsg,
  constructExecuteNFTTransfer,
  getPublicKeyMultibase,
  constructQueryReputationScore,
  createStargateClient,
  createNonSigningClient
} from './utils';

import {
  smartContractExecuteRPC,
  smartContractQueryRPC,
  smartContractCodeInstantiateRPC
} from './smartContract';
import { buildTable, getNFTTokensData, getContractMetadata, populateActivities } from './elements';
import "./styles/style.css";
import { filterCompletedActivities, getActivities, getActivitiesById, getActivity1, getActivity2, getActivityStatusByDidId, getScore, getScoreWithBreakdown, performAsyncActivity, performOsmosisActivity } from './score';
import { generateAndSignDidDocument, setDidDocument } from './ssi/document';
import { checkIfDidExists, registerDIDCreateTransaction } from './ssi/rpc';

// Load Osmosis Chain Config
// TODO: Make it dynamic using a drop down
const chain = "hypersignLocalnet"

const chainConfig = supportedChains[chain];
const chainId = chainConfig["chainId"];
const chainRPC = chainConfig["rpc"]
const chainREST = chainConfig["rest"]
const chainCoinDenom = chainConfig["feeCurrencies"][0]["coinMinimalDenom"]

// Define HTML elements
let walletDidIdSpan = document.getElementById("keplrDidId");
let walletConnectButton = document.getElementById("WalletLogin");
let scoreRefreshBtn = document.getElementById("scoreRefreshBtn");
let cardParent = document.getElementById("cardParent");
let registerDidBtn = document.getElementById("registerDidBtn");
let scoreParent = document.getElementById("score-parent");
let checkIconSpan = document.getElementById("check-icon");

// Global vars (Keplr)
let didId = ""
let offlineSigner = ""; // Keplr Signer
let signingClient = null;
let normalClient = null
let userAddress = "";
let stargateSigningClient = null;
let namespace = "devnet"
let pubKeyMultibase = ""

// Score
let didScore = document.getElementById("didScore");

// Activities
let activities = [];
let activitiesByDidId = [];
let activityIdx = null;

// Contract Addresses
const reputationEngineContractAddress = process.env.REPUTATION_ENGINE_CONTRACT_ADDRESS;
const activityManagerContractAddress = process.env.ACTIVITY_MANAGER_CONTRACT_ADDRESS;
const osmosisActivityContractAddress = process.env.OSMOSIS_ACTIVITY_CONTRACT_ADDRESS;

window.onload = async () => {
  normalClient = await createNonSigningClient(chainRPC)

  // Display all Activities
  activities = await getActivities(normalClient, activityManagerContractAddress)
  activityIdx = populateActivities(cardParent, activities, activitiesByDidId)

  
}

// Load the address upon connecting the wallet
// and enable the input field to enter Smart Contract
walletConnectButton.onclick = async () => {
  if (walletConnectButton.textContent.includes("Disconnect")) {
    // Change Keplr Button to Connect
    walletConnectButton.classList.remove("btn-secondary");
    walletConnectButton.classList.add("btn-primary");
    walletConnectButton.innerHTML = '<i class="fas fa-sync" id="icon-keplr"></i> Connect Keplr';

    // Remove offline signer and address
    offlineSigner = null
    userAddress = ""
    didScore.innerText = 0
    walletDidIdSpan.innerText = ""
    didId = ""
    pubKeyMultibase = ""
    scoreParent.style.display = "none";

    return
  } else {
    if (!window.getOfflineSigner || !window.keplr) {
      alert("Please install keplr extension");
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain(
            chainConfig
          );
          
          await window.keplr.enable(chainId);
          offlineSigner = window.getOfflineSigner(chainId)
          userAddress = await getUserAddressFromOfflineSigner(offlineSigner);
          console.log("User Address: ", userAddress)
          signingClient = await createClient(chainRPC, offlineSigner);
          stargateSigningClient = await createStargateClient(chainRPC, offlineSigner);

          // Create DID Id
          pubKeyMultibase = await getPublicKeyMultibase(chainId)
          didId = "did:hid:" + namespace + ":" + pubKeyMultibase;
          
          let ifDidExists = await checkIfDidExists(chainREST, didId)
          if (!ifDidExists) {
            setDidDocument(document.getElementById("didDocArea"), pubKeyMultibase, userAddress, namespace)
            $('#customModal').modal('show');
          } else {
            walletDidIdSpan.innerText = didId

            // Display Activities done by DID Id
            activitiesByDidId = await getActivitiesById(normalClient, activityManagerContractAddress, didId)
            activityIdx = populateActivities(cardParent, activities, activitiesByDidId)

            // Get Score
            scoreParent.style.display = "block";
            didScore.innerText = await getScore(signingClient, reputationEngineContractAddress, didId, activityManagerContractAddress)

           // Change Keplr Button to Disconnect
            walletConnectButton.innerHTML = '<i class="fas fa-times" id="icon-keplr"></i> Disconnect';
            walletConnectButton.classList.remove("btn-primary");
            walletConnectButton.classList.add("btn-secondary");
            
          }

        } catch (err) {
          console.log(err)
          alert("Failed to suggest the chain");
          return
        }
      } else {
        alert("Please use the recent version of keplr extension");
        return
      }
    }
  }
};

registerDidBtn.onclick = async () => {
  console.log("namespace  : ", namespace)
  let didDocElems = await generateAndSignDidDocument(pubKeyMultibase, userAddress, namespace, chainId)
  let res = await registerDIDCreateTransaction(stargateSigningClient, didDocElems, userAddress)
  console.log(res)
  if (res["code"] !== 0) {
    throw new Error("transaction failed: ", res["rawLog"])
  } else {
    walletDidIdSpan.innerText = didId

    // Activities
    activities = await getActivities(signingClient, activityManagerContractAddress)
    activitiesByDidId = await getActivitiesById(signingClient, activityManagerContractAddress, didId)

    activityIdx = populateActivities(cardParent, activities, activitiesByDidId)

    // Get Score
    didScore.innerText = await getScore(signingClient, reputationEngineContractAddress, didId, activityManagerContractAddress)

    // Change Keplr Button to Disconnect
    walletConnectButton.innerHTML = '<i class="fas fa-times" id="icon-keplr"></i> Disconnect';
    walletConnectButton.classList.remove("btn-primary");
    walletConnectButton.classList.add("btn-secondary");

    // Close Modal
    $('#customModal').modal('hide');
            
  }
}


// Refresh button to fetch score
scoreRefreshBtn.onclick = async () => {
  if (signingClient == null) {
    alert("Please connect your Keplr Wallet")
  } else {
    didScore.innerText = await getScore(signingClient, reputationEngineContractAddress, didId, activityManagerContractAddress)
  }
}

async function setExecuteBtnToLoad(target) {
  target.innerHTML = `
  <div class="spinner-border text-light" role="status">
  <span class="sr-only">Loading...</span>
  </div>
  `
  target.disabled = true
}

// Add event to all verify buttons
cardParent.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.classList.contains('activity-verify-btn')) {
    if (!confirm("This is a on-chain activity. You will incur gas fee even if the tx fails. Make sure you have already provided liquidity on Osmosis LP pool")) {
      return
    }

    const idx = target.dataset.activityIndex;

    try {
      let pool_id = 1;
      let ibc_channel = "channel-13";
      await performOsmosisActivity(signingClient, userAddress, activityIdx[idx], didId, pool_id, ibc_channel)
      
    } catch (error) {
      alert(error)
      return
    } finally {
      await setExecuteBtnToLoad(target)
  
      const interval = setInterval( async () => {
        let response = await getActivityStatusByDidId(normalClient, activityIdx[idx], didId)
        if (response) {
          clearInterval(interval)
          target.style.display = 'none';
          
          let checkIcon = document.getElementById(`check-icon-${idx}`)
          checkIcon.innerHTML ='<i class="fas fa-check"></i>'
          checkIcon.previousElementSibling.style.display = 'none';

          didScore.innerText = await getScore(normalClient, reputationEngineContractAddress, didId, activityManagerContractAddress)
        }
      }, 2000)
    }
  }
})

function getVerifyButtonElementForActivityIdx(idx) {
  let verifyBtns = document.getElementsByClassName("activity-verify-btn")
  for (let i = 0; i < verifyBtns.length; i++) {
    if (verifyBtns[i].dataset.activityIndex == idx) {
      verifyBtns[i].innerHTML = '<i class="fas fa-check"></i>';
      verifyBtns[i].disabled = true;
      return
    }
  }
}

// Add event to all verify buttons
// cardParent.addEventListener('click', async (event) => {
//   const target = event.target;

//   if (target.classList.contains('activity-reload-btn')) {
//     const idx = target.dataset.activityIndex;

//     try {
//       let scoreComplete = await getScoreWithBreakdown(signingClient, reputationEngineContractAddress, didId, "")
//       let activitiesDoneByDidId = scoreComplete["score_breakdown"]["activities"]
      
//       if (checkActivityDoneAfterReload(activitiesDoneByDidId, activityIdx[idx])) {
//         getVerifyButtonElementForActivityIdx(idx)
//         target.style.display = 'none'
//         didScore.innerText = await getScore(signingClient, reputationEngineContractAddress, didId, activityManagerContractAddress)
//         return
//       } else {
//         // add alert
//         alert("Activity has not been completed")
//       }

//     } catch (error) {
//       alert(error)
//     }
//   }
// })


// // check if particular activity is done
// function checkActivityDoneAfterReload(activitiesDoneByDidId, activityIdToSearch) {
//   for (let i = 0; i < activitiesDoneByDidId.length; i++) {
//     if (activityIdToSearch === activitiesDoneByDidId[i]["id"]) {
//       return true
//     }
//   }

//   return false
// }