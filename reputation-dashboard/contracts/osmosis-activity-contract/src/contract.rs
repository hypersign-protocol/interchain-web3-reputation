#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, to_json_binary};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::execute::execute_perform_activity;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::query::{query_check_activity_status, query_name, query_score};
use crate::state::{ActivityInfo, ACTIVITY_INFO};

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:activity-contract";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let activity_info = ActivityInfo {
        name: msg.name,
        score: msg.score,
    };
     
    ACTIVITY_INFO.save(deps.storage, &activity_info)?;

    Ok(Response::new()
        .add_attribute("activity_name", &activity_info.name)
        .add_attribute("activity_score", &activity_info.score.to_string())
    )
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::PerformActivity { did_id, pool_id, ibc_channel } => execute_perform_activity(deps, env, did_id, pool_id, ibc_channel)
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Name {  } => to_json_binary(&query_name(deps)?),
        QueryMsg::Score {  } => to_json_binary(&query_score(deps)?),
        QueryMsg::CheckActivityStatus { did_id } => to_json_binary(&query_check_activity_status(deps, did_id)?)
    }
}

#[cfg(test)]
mod tests {}