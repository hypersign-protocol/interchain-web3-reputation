import { SigningCosmWasmClient, CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { SigningStargateClient } from '@cosmjs/stargate'
import { base58btc } from "multiformats/bases/base58"
import { Registry } from "@cosmjs/proto-signing"
import { MsgRegisterDID } from './generated/tx'

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

export async function createNonSigningClient(rpcUrl) {
    const client = CosmWasmClient.connect(rpcUrl)

    return client
}


export async function createStargateClient(rpcUrl, offlineSigner) {
    const registry = new Registry()
    const typeUrl = "/hypersign.ssi.v1.MsgRegisterDID";
    registry.register(typeUrl, MsgRegisterDID)
    const client = SigningStargateClient.connectWithSigner(
        rpcUrl,
        offlineSigner,
        { registry: registry}
    )

    return client
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

export function constructCheckActivityStatus(didId) {
    return {
        "check_activity_status": {
            "did_id": didId
        }
    }
}


export function constructQueryActivitiesByDidId(didId) {
    return {
        "activities_by_did_id": {
            "did_id": didId
        }
    }
}

export function constructQueryReputationScore(didId) {
    return {
        "query_score_by_did_id": {
            "did_id": didId,
        }
    }
}

export function constructExecutePerformOsmosisActivity(poolId, didId, ibcChannel) {
    return  {
        "perform_activity": {
            "activity_params": {
                "pool_id": poolId,
                "ibc_channel": ibcChannel
            },
            "did_id": didId,
        }
    }
}

export function constructExecutePerformStargazeActivity(didId, nftCollectionId, nftTokenId, ibcChannel) {
    return  {
        "perform_activity": {
            "activity_params": {
                "nft_collection_id": nftCollectionId,
                "nft_token_id": nftTokenId,
                "ibc_channel": ibcChannel
            },
            "did_id": didId,
        }
    }
}

export function constructExecutePerformOmniflixActivity(didId, denomId, nftTokenId, ibcChannel) {
    return  {
        "perform_activity": {
            "activity_params": {
                "denom_id": denomId,
                "nft_token_id": nftTokenId,
                "ibc_channel": ibcChannel
            },
            "did_id": didId,
        }
    }
}

export function constructExecutePerformBalanceActivity(didId) {
    return  {
        "perform_activity": {
            "activity_params": {},
            "did_id": didId,
        }
    }
}

export function findAlreadyDoneActivities(activityList, activity) {
    for (var i = 0; i < activityList.length; i++) {
        if (activity.id === activityList[i].id) {
            return true
        }
    }
    return false
}