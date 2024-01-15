use cosmwasm_std::{Response, WasmMsg, to_json_binary, SubMsg, Deps, Binary};

use crate::{ContractError, msg::ActivityMsg, reply::{REGISTER_ACTIVITY_REPLY_ID, PERFORM_ACTIVITY_REPLY_ID}, query::query_activity};

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