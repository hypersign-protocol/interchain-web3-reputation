#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, StdError, to_json_binary};
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::execute::execute_claim_airdrop;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::query::{query_contract_balance, query_airdrop_status_for_address, query_airdrop_eligibility};
use crate::state::{AIRDROP_CONFIG, AirdropConfig};

/*
// version info for migration info
const CONTRACT_NAME: &str = "crates.io:airdrop-contract";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
*/

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let airdrop_fund = info.funds;
    if airdrop_fund.len() == 0 {
        ContractError::Std(StdError::generic_err("funds are needed to initialize the airdrop contract"));
    }

    // Check if provided fund in InstantiateMsg matches the actual provided fund
    if airdrop_fund[0].amount.le(&msg.airdrop_amount) {
        ContractError::Std(StdError::generic_err("funds provided are lesser than the aidrop amount"));
    } 

    // Store the config
    AIRDROP_CONFIG.save(deps.storage, &AirdropConfig {
        airdrop_amount: msg.airdrop_amount,
        threshold_score: msg.threshold_score
    })?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("author", info.sender)
        .add_attribute("airdrop_threshold_score", msg.threshold_score)
        .add_attribute("airdrop_amount", msg.airdrop_amount))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::ClaimAirdrop { 
            user_address, 
            reputation_contract_adress 
        } => execute_claim_airdrop(
            deps, 
            reputation_contract_adress, 
            user_address
        )
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        // For debug //
        QueryMsg::GetAirdropStatus { address } => to_json_binary(
            &query_airdrop_status_for_address(deps, address)?
        ),
        // -------- //
        QueryMsg::GetContractBalance {  } => to_json_binary(
            &query_contract_balance(deps, env)?
        ),
        QueryMsg::Eligibity { address, reputation_contract_address } => to_json_binary(
            &query_airdrop_eligibility(deps, address, reputation_contract_address)?
        )
    }
}

#[cfg(test)]
mod tests {}
