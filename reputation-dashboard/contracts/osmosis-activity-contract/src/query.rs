use cosmwasm_std::{Deps, StdResult};

use crate::{msg::{CheckActivityStatusResponse, NameResponse, ScoreResponse}, state::{ACTIVITY_INFO, ACTIVITY_MAP}, ContractError};

pub fn query_name(deps: Deps) -> StdResult<NameResponse> {
    let activity_info = ACTIVITY_INFO.load(deps.storage)?;
    Ok(NameResponse { activity_name: activity_info.name })
}

pub fn query_score(deps: Deps) -> StdResult<ScoreResponse> {
    let activity_info = ACTIVITY_INFO.load(deps.storage)?;
    Ok(ScoreResponse { activity_score: activity_info.score })
}

pub fn query_check_activity_status(deps: Deps, did_id: String) -> StdResult<CheckActivityStatusResponse> {
    let is_activity_completed = ACTIVITY_MAP.has(deps.storage, did_id);
    Ok(CheckActivityStatusResponse { is_activity_completed })
}