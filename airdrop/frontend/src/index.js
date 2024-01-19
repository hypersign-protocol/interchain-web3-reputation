import "./styles/style.css";
import { supportedChains } from './chains';
import { checkAirdropDone, checkAirdropFundInHID, checkEligibility, claimAirdrop, getAddressList, getAidropAmount as getAirdropAmount, getScore } from './score';
import {
    getUserAddressFromOfflineSigner,
    createClient,
    createNonSigningClient,
} from './utils';
import { buildTable } from "./table";
// Chain Config
const chain = "hypersignLocalnet"

const chainConfig = supportedChains[chain];
const chainId = chainConfig["chainId"];
const chainRPC = chainConfig["rpc"];

// Define HTML elements
let walletDidIdSpan = document.getElementById("keplrDidId");
let errorToast = document.getElementById("error-msg");
let walletConnectButton = document.getElementById("WalletLogin");
let scoreRefreshBtn = document.getElementById("scoreRefreshBtn");
let claimBtn = document.getElementById("claimBtn");
let walletAddressInputText = document.getElementById("walletAddressInput")
let airdropFunds = document.getElementById("funds")
let addressTable = document.getElementById("airdropped-addresses");

// Global vars (Keplr)
let didId = ""
let offlineSigner = ""; // Keplr Signer
let signingClient = null;
let normalClient = null;
let userAddress = "";
let funds = 0;
let addressLists = []
let airdropAmount = ""

const reputationEngineContractAddress =  process.env.REPUTATION_ENGINE_CONTRACT_ADDRESS;
const airdropContractAddress =  process.env.AIRDROP_CONTRACT_ADDRESS;

window.onload = async () => {
    normalClient = await createNonSigningClient(chainRPC)

    // Display Funds
    document.getElementById("airdrop-pool-card").style.display = 'block';
    funds = await checkAirdropFundInHID(normalClient, airdropContractAddress)
    airdropFunds.innerText = funds

    // Display Table
    airdropAmount = await getAirdropAmount(normalClient, airdropContractAddress)
    addressLists = await getAddressList(normalClient, airdropContractAddress)
    buildTable(addressTable, addressLists, airdropAmount)
}

// Load the address upon connecting the wallet
// and enable the input field to enter Smart Contract
walletConnectButton.onclick = async () => {
    if (walletConnectButton.textContent.includes("Disconnect")) {
        walletConnectButton.classList.remove("btn-secondary");
        walletConnectButton.classList.add("btn-primary");
        walletConnectButton.innerHTML = '<i class="fas fa-sync" id="icon-keplr"></i> Connect Keplr';
        
        // Remove offline signer and address
        offlineSigner = null
        userAddress = ""
        walletAddressInputText.placeholder = "Connect your Wallet"
        document.getElementById("airdrop-pool-card").style.display = 'none';
        claimBtn.disabled = true;

        return;
    } else {
        if (!window.getOfflineSigner || !window.keplr) {
            alert("Please install keplr extension");
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {
                    await window.keplr.experimentalSuggestChain(
                        chainConfig
                    );

                    walletConnectButton.innerHTML = '<i class="fas fa-times" id="icon-keplr"></i> Disconnect';
                    walletConnectButton.classList.remove("btn-primary");
                    walletConnectButton.classList.add("btn-secondary");
                } catch (err) {
                    alert(err);
                    return
                }
            } else {
                alert("Please use the recent version of keplr extension");
                return
            }
        }
    }

    // Get the wallet address
    await window.keplr.enable(chainId);
    offlineSigner = window.getOfflineSigner(chainId)
    userAddress = await getUserAddressFromOfflineSigner(offlineSigner);
    
    // Attach userAddress to text input
    walletAddressInputText.placeholder = userAddress
    claimBtn.disabled = false;

    console.log("User Address: ", userAddress)
    signingClient = await createClient(chainRPC, offlineSigner);
   
    console.log("Wallet address " + userAddress + " is active")
};

claimBtn.onclick = async () => {
    let eligibityResp = await checkEligibility(signingClient, userAddress, reputationEngineContractAddress, airdropContractAddress)
    if (!eligibityResp["result"]) {
        errorToast.innerHTML = ""
        setTimeout(function () {
            errorToast.innerHTML = "Error: You do not have enough reputation (>200) to claim this Airdrop. Kindly navigate to <a href='http://localhost:8080' target='_blank'>Reputation Dashboard</a> to generate your reputation";
        }, 100);
        return
    }

    let airdropDone = await checkAirdropDone(signingClient, userAddress, airdropContractAddress)
    if (airdropDone) {
        errorToast.innerHTML = ""
        setTimeout(function() {
            errorToast.innerHTML = "Error: This address has already recieved the Airdrop"
        }, 100)
        return    
    }

    errorToast.innerHTML = ""
    try {
        await claimAirdrop(signingClient, userAddress, userAddress, reputationEngineContractAddress, airdropContractAddress)
        airdropAmount = await getAirdropAmount(normalClient, airdropContractAddress)
        addressLists = await getAddressList(normalClient, airdropContractAddress)
        buildTable(addressTable, addressLists, airdropAmount)
    } catch(err) {
        throw new Error(err)
    }

    funds = await checkAirdropFundInHID(signingClient, airdropContractAddress)
    airdropFunds.innerText = funds
}


