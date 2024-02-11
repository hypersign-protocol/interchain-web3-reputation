use std::ops::Add;

use cosmwasm_std::{Deps, StdResult, Uint128};

use crate::{msg::{ActivitiesByDidIdResponse, Activity, ActivityByIdResponse, ActivityStatus, DidIdByAddressResponse, ExternalQuery, QueryScoreResponse, ScoreDetails}, state::CONFIG};

pub fn query_score_by_address(deps: Deps, user_address: String) -> StdResult<QueryScoreResponse> {
    // Get Activity Manager Contract address
    let activity_manager_contract_addr = CONFIG.load(deps.storage).unwrap().activity_manager_contract_address;
    
    // Get the DID Id
    let response: StdResult<DidIdByAddressResponse> = match deps.querier.query_wasm_smart(
        activity_manager_contract_addr.clone(),
        &ExternalQuery::DidIdByAddress { address: user_address }
    ) {
        Err(err) => {
            return Err(err);
        },
        Ok(r) => Ok(r)
    };

    let did_id = response.unwrap().did_id;

    query_score_by_did_id(deps, did_id)

}

pub fn query_score_by_did_id(deps: Deps, did_id: String) -> StdResult<QueryScoreResponse> {
    // Get Activity Manager Contract address
    let activity_manager_contract_addr = CONFIG.load(deps.storage).unwrap().activity_manager_contract_address;
    
    
    // When interacting with this function, it will not be expected than an activity manager
    // contract is already deployed. Hence, if the contract_address is empty, the reponse
    // should be default instead of an error
    if activity_manager_contract_addr.is_empty() || did_id.is_empty() {
        return Ok(QueryScoreResponse { 
            user_did: String::new(),
            score: Uint128::new(0),
            score_breakdown: ScoreDetails {
                activities: vec![]
            }
        })
    }
    
    // Get the list of activites for input DID from Task Contract
    let response: StdResult<ActivitiesByDidIdResponse> = match deps.querier.query_wasm_smart(
        activity_manager_contract_addr.clone(),
        &ExternalQuery::ActivitiesByDidId { did_id: did_id.clone() }
    ) {
        Err(err) => {
            return Err(err);
        },
        Ok(r) => Ok(r)
    };

    // Calculate score (Just add them up)
    let activities = response.unwrap().activities;
    let mut activity_obj_list: Vec<Activity> = vec![];
    let mut final_score: Uint128 = Uint128::new(0);

    for activity in activities.iter() {
        if activity.status.eq(&ActivityStatus::Done) {

            let activity_id = &activity.id;
    
            let response: StdResult<ActivityByIdResponse> = match deps.querier.query_wasm_smart(
                activity_manager_contract_addr.clone(),
                &ExternalQuery::Activity { id: activity_id.into() }
            ) {
                Err(err) => {
                    return Err(err);
                },
                Ok(r) => Ok(r)
            };
            
            let act = response.unwrap().activity;
            activity_obj_list.push(act.clone());
            final_score = final_score.add(act.score);
        }
    }

    Ok(QueryScoreResponse { 
        user_did: did_id.clone(),
        score: final_score,
        score_breakdown: ScoreDetails {
            activities: activity_obj_list
        }
    })
}
