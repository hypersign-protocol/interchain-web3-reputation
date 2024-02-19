import { smartContractExecuteRPC, smartContractQueryRPC } from "./smartContract";
import { 
    constructExecutePerformActivity, 
    constructQueryActivities, 
    constructQueryActivitiesByDidId, 
    constructQueryReputationScore,
    constructExecutePerformAsyncActivity,
    constructExecutePerformOsmosisActivity,
    constructCheckActivityStatus,
    constructExecutePerformBalanceActivity
} from "./utils";

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
export async function getScoreWithBreakdown(client, reputationEngineContractAddr,  did_id, activity_manager_contract) {
    let result = await smartContractQueryRPC(client, reputationEngineContractAddr, constructQueryReputationScore(
        did_id
      )
    )

    return result
}

export async function getScore(client, reputationEngineContractAddr,  did_id, activity_manager_contract) {
    let result = await getScoreWithBreakdown(client, reputationEngineContractAddr, did_id, activity_manager_contract)
    console.log(result)
    return result["score"]
}

export async function getActivities (client, activityManagerContract) {
    let result = await smartContractQueryRPC(client, activityManagerContract, constructQueryActivities())
    return result["activities"]
}

export async function getActivitiesById (client, activityManagerContract, didId) {
    let result = await smartContractQueryRPC(client, activityManagerContract, constructQueryActivitiesByDidId(didId))
    return result["activities"]
}

export async function getActivityStatusByDidId (client, activityContract, didId) {
    let result = await smartContractQueryRPC(client, activityContract, constructCheckActivityStatus(didId))
    return result["is_activity_completed"]
}

export async function performOsmosisActivity(client, author, activityContractAddr, didId, poolId, ibcChannel) {
    try {
        await smartContractExecuteRPC(client, author, activityContractAddr, constructExecutePerformOsmosisActivity(poolId, didId, ibcChannel))
    } catch (error) {
        throw new Error("unable to perform Osmosis Liquidity Position activity: ", error)
    }
}

export async function performBalanceActivity(client, author, activityContractAddr, didId) {
    try {
        await smartContractExecuteRPC(client, author, activityContractAddr, constructExecutePerformBalanceActivity(didId))
    } catch (error) {
        console.log("errrr ", error)
        throw new Error("unable to perform Hypersign Balance Check activity: ", error)
    }
}


