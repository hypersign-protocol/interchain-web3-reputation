import { smartContractExecuteRPC, smartContractQueryRPC } from "./smartContract";
import { constructQueryAirdropFunds, constructQueryAirdropInfo, constructQueryAirdroppedAddresses, constructQueryIfAirdropDone } from "./utils";
import { constructExecuteClaimAirdrop } from "./utils";
import { constructQueryEligibilityAirdrop } from "./utils";
import { constructQueryReputationScore } from "./utils";

/**
   {
    "user_did": "did:hid:devnet:zthiac6RJ46TPSDQ3GGE6YA3ggaTJHXfjrYR38vcVoecH",
    "score": "286",
    "score_breakdown": {
        "activities": [
            {
                "id": "hid1xwyr5fqrgpueffa84uj8aglfea23qwlr00medkserpk3r7wpvslqefd5h4",
                "name": "dummy_task",
                "score": "43"
            },
            {
                "id": "hid16xmuxltnrf4sfan0eynylzc2s40lje42vgg6hw3z9ld2awcr2cesg3h39r",
                "name": "dummy_task_2",
                "score": "243"
            }
        ]
    }
}
*/
export async function getScoreWithBreakdown(client, reputationEngineContractAddr,  address) {
    let result = await smartContractQueryRPC(client, reputationEngineContractAddr, constructQueryReputationScore(
        address
      )
    )

    return result
}

export async function getScore(client, reputationEngineContractAddr,  address) {
    let result = await getScoreWithBreakdown(client, reputationEngineContractAddr, address)
    console.log(result)
    return result["score"]
}


export async function checkEligibility(client, address, reputationEngineContractAddr, airdropContractAddr) {
    let result = await smartContractQueryRPC(client, airdropContractAddr, constructQueryEligibilityAirdrop(
        address, reputationEngineContractAddr
      )
    )

    return result
}

export async function claimAirdrop(client, txAuthor, airdropAddress, reputationEngineContractAddr, airdropContractAddr) {
    await smartContractExecuteRPC(client, txAuthor, airdropContractAddr, constructExecuteClaimAirdrop(
        airdropAddress,
        reputationEngineContractAddr
    ))
}

export async function checkAirdropDone(client, address, airdropContractAddr) {
    let result = await smartContractQueryRPC(client, airdropContractAddr, constructQueryIfAirdropDone(
        address
    ))

    return result["result"]
}

export async function checkAirdropFundInHID(client, airdropContractAddr) {
    let result = await smartContractQueryRPC(client, airdropContractAddr, constructQueryAirdropFunds())
    let resultNum = parseInt(result["amount"]["amount"], 10)
    let amountInHid = resultNum / 1000000
    return amountInHid.toFixed(2)
}

export async function getAddressList(client, airdropContractAddr) {
    let result = await smartContractQueryRPC(client, airdropContractAddr, constructQueryAirdroppedAddresses())
    return result["addresses"]
}

export async function getAidropScoreThreshold(client, airdropContractAddr) {
    let result = await smartContractQueryRPC(client, airdropContractAddr, constructQueryAirdropInfo())
    return result["threshold_score"]
}

export async function getAidropAmount(client, airdropContractAddr) {
    let result = await smartContractQueryRPC(client, airdropContractAddr, constructQueryAirdropInfo())
    let amountInHid = result["airdrop_amount"] / 1000000
    return amountInHid.toFixed(1)
}
