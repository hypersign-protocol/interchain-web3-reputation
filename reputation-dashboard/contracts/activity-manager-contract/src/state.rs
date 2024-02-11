use cosmwasm_std::Uint128;
use cw_storage_plus::Map;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Activity {
    pub id: String,
    pub name: String,
    pub score: Uint128,
    pub status: ActivityStatus
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub enum ActivityStatus {
    Registered,
    Done,
    Pending
}

// id: Activity
pub const ACTIVITIES: Map<String, Activity> = Map::new("activity_register");

// Did_Id : List<Activity_Id>
pub const DID_ACTIVITY_MAP: Map<String, Vec<Activity>> = Map::new("did_activity_map");
