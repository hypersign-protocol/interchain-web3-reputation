use cosmwasm_std::Uint128;
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ActivityInfo {
    pub name: String,
    pub score: Uint128,
    pub threshold_balance: Uint128,
}

pub const ACTIVITY_INFO: Item<ActivityInfo> = Item::new("activity_info");

pub const ACTIVITY_MAP: Map<String, bool> = Map::new("activity_map");
