use cosmwasm_std::{from_json, Binary, Deps, StdError, StdResult};

use crate::{msg::{CheckActivityResponse, NameResponse, ScoreResponse}, state::{ActivityParams, ACTIVITY_INFO, ACTIVITY_MAP}, ContractError};

pub fn query_name(deps: Deps) -> StdResult<NameResponse> {
    let activity_info = ACTIVITY_INFO.load(deps.storage)?;
    Ok(NameResponse { activity_name: activity_info.name })
}

pub fn query_score(deps: Deps) -> StdResult<ScoreResponse> {
    let activity_info = ACTIVITY_INFO.load(deps.storage)?;
    Ok(ScoreResponse { activity_score: activity_info.score })
}

pub fn query_did(deps: Deps, did_id: String) -> StdResult<CheckActivityResponse> {
    let result = ACTIVITY_MAP.has(deps.storage, did_id);
    Ok(CheckActivityResponse { result })
}


pub fn query_check_activity(deps: Deps, activity_params: Binary) -> StdResult<CheckActivityResponse> {
    // Deserialise Activity Params
    let params: ActivityParams = match from_json(&activity_params) {
        Ok(r) => r,
        Err(e) => return Err(StdError::generic_err("unable to parse params"))
    };

    let did_id: String = params.did_id;
    query_did(deps, did_id)
}