use cosmwasm_std::{to_json_binary, Binary, Deps, DepsMut, Response, StdError, StdResult, SubMsg, WasmMsg};

use crate::{msg::{ActivityMsg, ActivityQuery, CheckActivityResponse}, query::query_activity, reply::{update_activity_for_did_id, PERFORM_ACTIVITY_REPLY_ID, REGISTER_ACTIVITY_REPLY_ID}, state::ActivityStatus, ContractError};

pub fn execute_register_activity(contract_address: String) -> Result<Response, ContractError> {
    let activity_msg = ActivityMsg::VerifyActivity { 
        activity_params: to_json_binary("").unwrap(), 
        register_verify: true 
    };

    let msg = WasmMsg::Execute { 
        contract_addr: contract_address, 
        msg: to_json_binary(&activity_msg)?, 
        funds: vec![]
    };

    let sub_msg = SubMsg::reply_on_success(msg, REGISTER_ACTIVITY_REPLY_ID);

    Ok(Response::new().add_submessage(sub_msg))
}

pub fn execute_perform_async_activity(deps: DepsMut, activity_id: String, did_id: String, activity_params: Binary, check_status: bool) -> Result<Response, ContractError> {
    //  Instead of a submessage, just send a message if we are not checking the status
    if !check_status {
        let activity = query_activity(deps.as_ref(), activity_id).unwrap().activity;
    
        let activity_msg = ActivityMsg::VerifyActivity { 
            activity_params: activity_params,
            register_verify: false 
        };

        let activity_id = activity.id.clone();
        let msg = WasmMsg::Execute {
            contract_addr: activity_id, 
            msg: to_json_binary(&activity_msg)?, 
            funds: vec![]
        };

        match update_activity_for_did_id(deps, did_id.as_str(), activity.clone(), ActivityStatus::Pending) {
            Ok(_) => return Ok(Response::new().add_message(msg)),
            Err(e) => return Err(ContractError::Std(e))
        };

    } else {
        let activity = query_activity(deps.as_ref(), activity_id).unwrap().activity;

        let activity_status_response: StdResult<CheckActivityResponse> = match deps.querier.query_wasm_smart(
            activity.id.clone(),
            &ActivityQuery::CheckActivity { activity_params: activity_params }
        ) {
            Err(_) => {
                return Err(ContractError::Std(StdError::generic_err("unable to fetch Activity Status")))
            },
            Ok(resp) => Ok(resp)
        };

        if activity_status_response.unwrap().result {
            match update_activity_for_did_id(deps, did_id.as_str(), activity.clone(), ActivityStatus::Done) {
                Ok(_) => return Ok(Response::new()),
                Err(e) => return Err(ContractError::Std(e))
            };
        } else {
            return Err(ContractError::Std(StdError::generic_err("activity has not been completed")))
        }
    }
}

pub fn execute_perform_activity(deps: Deps, activity_id: String, activity_params: Binary) -> Result<Response, ContractError> {
    let activity = query_activity(deps, activity_id).unwrap().activity;
    
    let activity_msg = ActivityMsg::VerifyActivity { 
        activity_params: activity_params,
        register_verify: false 
    };

    let msg = WasmMsg::Execute {
        contract_addr: activity.id, 
        msg: to_json_binary(&activity_msg)?, 
        funds: vec![]
    };

    let sub_msg = SubMsg::reply_on_success(msg, PERFORM_ACTIVITY_REPLY_ID);

    Ok(Response::new().add_submessage(sub_msg))
}