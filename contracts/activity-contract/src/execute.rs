use cosmwasm_std::{Response, DepsMut, Event, Env, Binary, from_json, StdError, Uint128, Deps};

use crate::{ContractError, state::{ActivityParams, ACTIVITY_INFO, ACTIVITY_MAP}, ssi::get_blockchain_address};
use crate::ssi::query_did_doc;

pub fn execute_verify_activity(deps: DepsMut, env: Env, activity_params: Binary, register_verify: bool) -> Result<Response, ContractError> {
    // If the following is true, it means that the Activity Manger contract wants to test
    // this function's existence, but full execute it. The error thrown is expected and will
    // be considered as signal to move forward with Contract Registeration on Activity Manager
    // Contract end
    if register_verify {
        Ok(Response::new()
            .add_event(Event::new("wasm").add_attribute("activity_verification", env.contract.address)))
    } else {
        // Deserialise Activity Params
        let params: ActivityParams = match from_json(&activity_params) {
            Ok(r) => r,
            Err(e) => return Err(ContractError::Std(e))
        };

        // Extract Params
        let did_id = params.did_id;

         // Fetch DID Id using x/ssi hooks
        let did_doc = query_did_doc(deps.as_ref(), &did_id)
        .map_err(|_| {
            ContractError::Std(StdError::not_found(format!("DID Document '{}' not found", did_id)))
        })?;

        // Return an error if an activity is already done by the did
        if ACTIVITY_MAP.has(deps.storage, did_id.clone()) {
            return Err(ContractError::Std(StdError::generic_err("activity has already been performed")))
        }

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
    
}


fn get_threshold(deps: Deps) -> Uint128 {
    let activity_info = ACTIVITY_INFO.load(deps.storage).unwrap();
    activity_info.threshold_balance
}