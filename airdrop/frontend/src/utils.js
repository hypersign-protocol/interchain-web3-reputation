import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { base58btc } from "multiformats/bases/base58"

export async function getPublicKeyMultibase(chainId) {
    const doc = await window.keplr.getKey(chainId)
    const pubKeyBytes = doc["pubKey"]
    return base58btc.encode(pubKeyBytes)
}

export async function getUserAddressFromOfflineSigner(offlineSigner) {
  const accounts = await offlineSigner.getAccounts();
  const userAddress = accounts[0].address;
  return userAddress
}

export async function createClient(rpcUrl, offlineSigner) {
    const client = SigningCosmWasmClient.connectWithSigner(
        rpcUrl,
        offlineSigner
    )

    //;(await client).queryContractSmart()
    return client
}

export function constructQueryActivities() {
    return {
        "activities": {}
    }
}

export function constructQueryActivitiesByDidId(didId) {
    return {
        "activities_by_did_id": {
            "did_id": didId
        }
    }
}

export function constructQueryReputationScore(address) {
    return {
        "query_score_by_address": {
            "user_address": address
        }
    }
}

export function constructQueryEligibilityAirdrop(address, reputationContractAddress) {
    return {
        "eligibity": {
            "address": address,
            "reputation_contract_address": reputationContractAddress
        }
    }
}

export function constructQueryAirdropFunds() {
    return {
        "get_contract_balance": {}
    }
}

export function constructQueryIfAirdropDone(address) {
    return {
        "get_airdrop_status": {
            "address": address
        }
    }
}

export function constructExecuteClaimAirdrop(address, reputationContractAddress) {
    return {
        "claim_airdrop": {
            "user_address": address,
            "reputation_contract_adress": reputationContractAddress
        }
    }
}
