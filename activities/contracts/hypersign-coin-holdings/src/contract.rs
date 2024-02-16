use activity::{ActivityExecuteMsg, ActivityQueryMsg};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, to_json_binary};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::InstantiateMsg;
use crate::state::{ActivityInfo, ActivityParams, HypersignCoinHoldingsContract, ACTIVITY_INFO};

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
        description: msg.description,
        threshold_balance: msg.threshold_balance
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
    info: MessageInfo,
    msg: ActivityExecuteMsg<ActivityParams>,
) -> Result<Response, ContractError> {
    HypersignCoinHoldingsContract::default().execute(deps, env, info, msg)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: ActivityQueryMsg) -> StdResult<Binary> {
    HypersignCoinHoldingsContract::default().query(deps, env, msg)
}

#[cfg(test)]
mod tests {}
