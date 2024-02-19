use cosmwasm_std::{Deps, StdResult, StdError};

use crate::{msg::{ActivitiesResponse, ActivityQuery, ActivityResponse, CheckActivityStatusResponse}, state::{Activity, ACTIVITIES}};

pub fn query_activities(deps: Deps) -> StdResult<ActivitiesResponse> {
    let activities = ACTIVITIES
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|item| {
            let (_, activity) = item?;
            Ok(Activity {
                id: activity.id,
                name: activity.name,
                score: activity.score,
                description: activity.description
            })
        })
        .collect::<StdResult<Vec<Activity>>>()?;
    Ok(ActivitiesResponse { activities })
}

pub fn query_activities_by_did_id(deps: Deps, did_id: String) -> StdResult<ActivitiesResponse> {
    let activities = ACTIVITIES
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|item| {
            let (_, activity) = item?;
            Ok(Activity {
                id: activity.id,
                name: activity.name,
                score: activity.score,
                description: activity.description
            })
        })
        .collect::<StdResult<Vec<Activity>>>()?;

    let mut activities_by_id: Vec<Activity> = vec![];
    
    for activity in activities.iter() {
        let resp: StdResult<CheckActivityStatusResponse> = match deps.querier.query_wasm_smart(
            activity.clone().id,
            &ActivityQuery::CheckActivityStatus { did_id: did_id.clone() }
        ) {
            Err(e) => {
                return Err(e)
            },
            Ok(resp) => Ok(resp)
        };

        if resp.unwrap().is_activity_completed {
            activities_by_id.push(activity.clone())
        }
    }

    Ok(ActivitiesResponse { activities: activities_by_id })
}

pub fn query_activity(deps: Deps, activity_id: String) -> StdResult<ActivityResponse> {
    let activity = ACTIVITIES
        .load(deps.storage, activity_id.clone())
        .map_err(|_| StdError::not_found(format!("activity '{}' not found", &activity_id)))?;
    Ok(ActivityResponse { activity })
}
