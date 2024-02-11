use cosmwasm_std::{DepsMut, Reply, StdResult, Response, StdError, Event};

use crate::{msg::{ActivityQuery, NameResponse, ScoreResponse}, query::query_activity, state::{Activity, ActivityStatus, ACTIVITIES, DID_ACTIVITY_MAP}};

// Reply ID for RegisterActivity
pub const REGISTER_ACTIVITY_REPLY_ID: u64 = 1; 

// Reply ID for PerformActivity
pub const PERFORM_ACTIVITY_REPLY_ID: u64 = 2;


pub fn reply_register_activity(deps: DepsMut, msg: Reply) -> StdResult<Response> {
    // Callback from RegisterActivity function to check if the Activity Contract
    // has implemented the VerifyActivity
    let data = msg.result.into_result().map_err(StdError::generic_err)?;

    let event = data
        .events
        .iter()
        .find(|e| {
            e.attributes.iter().any(
                |attr| attr.key == "activity_verification"
            )
        })
        .ok_or_else(|| StdError::generic_err("unable to fetch activity_verification attibute from Activity contract"))?;

    let activity_contract_addr = get_attribute_value(event, "activity_verification")
    .ok_or_else(|| StdError::generic_err("Unable to extract activity_verification value from event"))?;
    
    // Check if Activity Contract has implemented the Name method
    let activity_name_response: StdResult<NameResponse> = match deps.querier.query_wasm_smart(
        activity_contract_addr,
        &ActivityQuery::Name {  }
    ) {
        Err(_) => {
            return Err(StdError::generic_err("unable to fetch Activity name"))
        },
        Ok(resp) => Ok(resp)
    };
    let activity_name = activity_name_response.unwrap().activity_name;

    // Check if Activity Contract has implemented the Score method
    let activity_score_response: StdResult<ScoreResponse> = match deps.querier.query_wasm_smart(
        activity_contract_addr,
        &ActivityQuery::Score {  }
    ) {
        Err(_) => {
            return Err(StdError::generic_err("unable to fetch Activity score"))
        },
        Ok(resp) => Ok(resp)
    };
    let activity_score = activity_score_response.unwrap().activity_score;

    // Register Activity
    let id = activity_contract_addr;
    let activity = Activity {
        id: id.clone(),
        name: activity_name,
        score: activity_score,
        status: ActivityStatus::Registered
    };
    
    ACTIVITIES.save(deps.storage, id.clone(), &activity)?;

    Ok(Response::new().add_attribute("activity_registered", activity.id))
}

pub fn reply_perform_activity(deps: DepsMut, msg: Reply) -> StdResult<Response> {
    // Callback from RegisterActivity function to check if the Activity Contract
    // has implemented the VerifyActivity
    let data = msg.result.into_result().map_err(StdError::generic_err)?;

    let event = data
        .events
        .iter()
        .find(|e| {
            e.attributes.iter().any(
                |attr| {
                    attr.key == "activity_performed_contract_addr" ||
                    attr.key == "activity_performed_did_id"
                }
            )
        })
        .ok_or_else(|| StdError::generic_err("failed to perform activity on counterparty contract"))?;

    // Extract Contract Address from Reply Events
    let activity_contract_addr = get_attribute_value(event, "activity_performed_contract_addr")
        .ok_or_else(|| StdError::generic_err("Unable to extract activity_performed_contract_addr value from event"))?;
    
    // Extract Did Id from Reply Events
    let activity_contract_did_id = get_attribute_value(event, "activity_performed_did_id")
        .ok_or_else(|| StdError::generic_err("Unable to extract activity_performed_did_id value from event"))?;

    let activity = query_activity(deps.as_ref(), activity_contract_addr.into()).unwrap().activity;

    match push_activity_for_did_id(deps, activity_contract_did_id, activity) {
        Ok(()) => Ok(Response::new()),
        Err(e) => Err(StdError::generic_err(format!("something occured while registering activity: {}", e)))
    }
}

fn get_attribute_value<'a>(event: &'a Event, key: &str) -> Option<&'a String> {
    event.attributes.iter().find(|attr| attr.key == key).map(|attr| &attr.value)
}

pub fn update_activity_for_did_id(deps: DepsMut, did_id: &str, activity: Activity, status: ActivityStatus) -> Result<(), StdError> {
    let activity_list = match DID_ACTIVITY_MAP.load(deps.as_ref().storage, did_id.to_string()) {
        Ok(mut activities) => {
            // Return an error if the activity is already registered
            for act in activities.iter_mut() {
                if act.id.eq(&activity.id) && status.eq(&ActivityStatus::Done) {
                    act.status = status.clone()
                } else {
                    return Err(StdError::generic_err("existing async activity status can only be changed to Done"))
                }
            }
            activities            
        },
        Err(_) => {
            if status.eq(&ActivityStatus::Pending) {
                let mut nw_activity = activity;
                nw_activity.status = ActivityStatus::Pending;
                vec![nw_activity]
            } else {
                return Err(StdError::generic_err("new async activity can only be set to Pending status"))
            }
        },
    };

    DID_ACTIVITY_MAP.save(deps.storage, did_id.to_string(), &activity_list)
}

fn push_activity_for_did_id(deps: DepsMut, did_id: &str, activity: Activity) -> Result<(), StdError> {
    let activity_list = match DID_ACTIVITY_MAP.load(deps.as_ref().storage, did_id.to_string()) {
        Ok(mut activities) => {
            // Return an error if the activity is already registered
            for act in activities.iter() {
                if act.id.eq(&activity.id) {
                    return Err(StdError::generic_err(format!("activity {} is already registered", &activity.id)))
                }
            }
            activities.push(activity);
            activities
        },
        Err(_) => vec![activity],
    };

    DID_ACTIVITY_MAP.save(deps.storage, did_id.to_string(), &activity_list)
}