use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Uint128, Binary};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};


#[cw_serde]
pub struct InstantiateMsg {
    pub name: String,
    pub score: Uint128,
    pub threshold_balance: Uint128
}

#[cw_serde]
pub enum ExecuteMsg {
    PerformActivity {
        did_id: String
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

    // For debugging
    #[returns(DidResponse)]
    Did {
        did_id: String
    },
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct NameResponse {
    pub activity_name: String
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ScoreResponse {
    pub activity_score: Uint128
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct CheckActivityStatusResponse {
    pub is_activity_completed: bool
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct DidResponse {
    pub result: bool
}