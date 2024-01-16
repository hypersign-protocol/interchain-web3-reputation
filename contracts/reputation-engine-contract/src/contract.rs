#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, to_json_binary};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::query::{query_score_by_did_id, query_score_by_address};
use crate::state::{CONFIG, Config};

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:reputation-engine-contract";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    CONFIG.save(deps.storage, &Config {
        activity_manager_contract_address: msg.activity_manager_contract_address
    })?;

    Ok(Response::new())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    unimplemented!()
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        // something
        QueryMsg::QueryScoreByDidId { did_id } => to_json_binary(&query_score_by_did_id(deps, did_id)?),
        QueryMsg::QueryScoreByAddress { user_address } => to_json_binary(&query_score_by_address(deps, user_address)?),
    }
}

#[cfg(test)]
mod tests {}
