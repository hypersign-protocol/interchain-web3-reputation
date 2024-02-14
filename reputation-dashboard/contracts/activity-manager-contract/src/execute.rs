use cosmwasm_std::{to_json_binary, CustomMsg, DepsMut, Response, StdError, StdResult, SubMsg, WasmMsg};

use crate::{msg::{ActivityQuery, CheckActivityStatusResponse, NameResponse, ScoreResponse}, state::{Activity, ACTIVITIES}, ContractError};

pub fn execute_register_activity(deps: DepsMut, contract_address: String) -> Result<Response, ContractError> {
    let activity_name_response: StdResult<NameResponse> = match deps.querier.query_wasm_smart(
        contract_address.clone(),
        &ActivityQuery::Name {  }
    ) {
        Err(_) => {
            return Err(ContractError::Std(StdError::generic_err("unable to fetch Activity name")))
        },
        Ok(resp) => Ok(resp)
    };
    let activity_name = activity_name_response.unwrap().activity_name;

    // Check if Activity Contract has implemented the Score method
    let activity_score_response: StdResult<ScoreResponse> = match deps.querier.query_wasm_smart(
        contract_address.clone(),
        &ActivityQuery::Score {  }
    ) {
        Err(_) => {
            return Err(ContractError::Std(StdError::generic_err("unable to fetch Activity score")))
        },
        Ok(resp) => Ok(resp)
    };
    let activity_score = activity_score_response.unwrap().activity_score;

    // Check if CheckActivityStatus method is implemented
    let _: StdResult<CheckActivityStatusResponse> = match deps.querier.query_wasm_smart(
        contract_address.clone(),
        &ActivityQuery::CheckActivityStatus { did_id: "did:hid:1".to_string() }
    ) {
        Err(_) => {
            return Err(ContractError::Std(StdError::generic_err("unable to query CheckActivityStatus function from Activity contract")))
        },
        Ok(resp) => Ok(resp)
    };
    
    // Register Activity
    let activity = Activity {
        id: contract_address.clone(), //TODO: make it external user input
        name: activity_name,
        score: activity_score,
    };
    
    ACTIVITIES.save(deps.storage, contract_address.clone(), &activity)?;

    Ok(Response::new().add_attribute("activity_registered", activity.id))
}
