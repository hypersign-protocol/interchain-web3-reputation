use cosmwasm_std::{Response, DepsMut, Env, StdError, Uint128, Deps};

use crate::{ContractError, state::{ACTIVITY_INFO, ACTIVITY_MAP}, ssi::get_blockchain_address};
use crate::ssi::query_did_doc;

// state: (wallet address <> LP provided yes or no?)

pub fn execute_perform_activity(deps: DepsMut, env: Env, did_id: String) -> Result<Response, ContractError> {
    // Fetch DID Id using x/ssi hooks
    let did_doc = query_did_doc(deps.as_ref(), &did_id)
    .map_err(|_| {
        ContractError::Std(StdError::not_found(format!("DID Document '{}' not found", did_id)))
    })?;


    let wallet_address = get_blockchain_address(&did_doc);
    let denom: &str = "uhid";
    let min_balance_threshold: Uint128 = get_threshold(deps.as_ref());
    let wallet_address_balance = deps.querier.query_balance(wallet_address, denom)?;

    if wallet_address_balance.amount.lt(&min_balance_threshold) {
        return Err(ContractError::Std(StdError::generic_err("criteria for activity not met")))
    } else {
        ACTIVITY_MAP.save(deps.storage, did_id.clone(), &true)?;
        Ok(Response::new()
            .add_attribute("activity_performed_contract_addr", env.contract.address)
            .add_attribute("activity_performed_did_id", did_id.clone())
        )
    }
   
}


fn get_threshold(deps: Deps) -> Uint128 {
    let activity_info = ACTIVITY_INFO.load(deps.storage).unwrap();
    activity_info.threshold_balance
}