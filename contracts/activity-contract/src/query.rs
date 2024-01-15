use cosmwasm_std::{Deps, StdResult};

use crate::{state::{ACTIVITY_INFO, ACTIVITY_MAP}, msg::{NameResponse, ScoreResponse, DidResponse}};

pub fn query_name(deps: Deps) -> StdResult<NameResponse> {
    let activity_info = ACTIVITY_INFO.load(deps.storage)?;
    Ok(NameResponse { activity_name: activity_info.name })
}

pub fn query_score(deps: Deps) -> StdResult<ScoreResponse> {
    let activity_info = ACTIVITY_INFO.load(deps.storage)?;
    Ok(ScoreResponse { activity_score: activity_info.score })
}

pub fn query_did(deps: Deps, did_id: String) -> StdResult<DidResponse> {
    let result = ACTIVITY_MAP.has(deps.storage, did_id);
    Ok(DidResponse { result })
}