use cw_storage_plus::Item;
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Config {
    pub activity_manager_contract_address: String
}

pub const CONFIG: Item<Config> = Item::new("config");