use cosmwasm_std::{Deps, StdResult, StdError};

use crate::{msg::{ActivitiesResponse, ActivityResponse}, state::{ACTIVITIES, Activity, DID_ACTIVITY_MAP}};

pub fn query_activities(deps: Deps) -> StdResult<ActivitiesResponse> {
    let activities = ACTIVITIES
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|item| {
            let (_, activity) = item?;
            Ok(Activity {
                id: activity.id,
                name: activity.name,
                score: activity.score
            })
        })
        .collect::<StdResult<Vec<Activity>>>()?;
    Ok(ActivitiesResponse { activities })
}

pub fn query_activities_by_did_id(deps: Deps, did_id: String) -> StdResult<ActivitiesResponse> {
    let activities: Vec<Activity> = DID_ACTIVITY_MAP.load(deps.storage, did_id)
        .unwrap_or_else(|_| vec![]);

    Ok(ActivitiesResponse { activities })
}

pub fn query_activity(deps: Deps, activity_id: String) -> StdResult<ActivityResponse> {
    let activity = ACTIVITIES
        .load(deps.storage, activity_id.clone())
        .map_err(|_| StdError::not_found(format!("activity '{}' not found", &activity_id)))?;
    Ok(ActivityResponse { activity })
}
