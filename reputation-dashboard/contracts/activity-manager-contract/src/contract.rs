#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Reply, StdError, to_json_binary};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::execute::execute_register_activity;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::query::{query_activities, query_activities_by_did_id, query_activity};
use crate::ssi::query_did_id_from_address;

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:activity-manager-contract";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    Ok(Response::new())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::RegisterActivity { contract_address } => execute_register_activity(deps, contract_address)
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Activities {  } => to_json_binary(&query_activities(deps)?),
        QueryMsg::ActivitiesByDidId { did_id } => to_json_binary(&query_activities_by_did_id(deps, did_id)?),
        QueryMsg::Activity { id } => to_json_binary(&query_activity(deps, id)?),
        QueryMsg::DidIdByAddress { address } => to_json_binary(&query_did_id_from_address(deps, &address)?)
    }
}

#[cfg(test)]
mod tests {}
