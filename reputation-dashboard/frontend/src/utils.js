import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
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

export function constructQueryActivitiesByDidId(didId) {
    return {
        "activities_by_did_id": {
            "did_id": didId
        }
    }
}

export function constructQueryReputationScore(didId, activity_contract) {
    return {
        "query_score_by_did_id": {
            "did_id": didId,
        }
    }
}

export function constructExecutePerformActivity(activityId, didId) {
    let activityParams = btoa(JSON.stringify(
        {
            "did_id": didId
        }
    ))

    return  {
        "perform_activity": {
            "activity_id": activityId,
            "activity_params": activityParams
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