use cosmwasm_std::Uint128;
use cw_storage_plus::{Map, Item};
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct AirdropConfig {
    pub threshold_score: Uint128,
    pub airdrop_amount: Uint128
}

pub const AIRDROP_STORE: Map<&String, bool> = Map::new("airdrop_store");
pub const AIRDROP_CONFIG: Item<AirdropConfig> = Item::new("airdrop_config");