use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Uint128, Binary};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};


#[cw_serde]
pub struct InstantiateMsg {
    pub name: String,
    pub score: Uint128
}

#[cw_serde]
pub enum ExecuteMsg {
    PerformActivity {
      pool_id: u64,
      did_id: String,
      ibc_channel: String, 
    }
}

#[cw_serde]
pub enum IbcQueryMsg {
    Verify {
        did_id: String,
        wallet_address: String,
        pool_id: u64
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(NameResponse)]
    Name {},

    #[returns(ScoreResponse)]
    Score {},

    #[returns(CheckActivityStatusResponse)]
    CheckActivityStatus{
        did_id: String
    },
}


#[cw_serde]
pub struct NameResponse {
    pub activity_name: String
}

#[cw_serde]
pub struct ScoreResponse {
    pub activity_score: Uint128
}

#[cw_serde]
pub struct CheckActivityStatusResponse {
    pub is_activity_completed: bool
}
