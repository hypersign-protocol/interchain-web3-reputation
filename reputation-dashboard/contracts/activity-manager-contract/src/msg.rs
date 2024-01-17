use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Uint128, Binary};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use crate::ssi::QueryDidDocumentFromAddressResponse;
use crate::state::Activity;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    RegisterActivity {
        contract_address: String
    },
    PerformActivity {
        activity_id: String,
        activity_params: Binary
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ActivitiesResponse)]
    Activities {},

    #[returns(ActivitiesResponse)]
    ActivitiesByDidId {
        did_id: String
    },

    #[returns(ActivityResponse)]
    Activity {
        id: String
    },
    
    #[returns(QueryDidDocumentFromAddressResponse)]
    DidIdByAddress {
        address: String
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct DidIdByAddressResponse {
    pub did_id: String
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ActivitiesResponse {
    pub activities: Vec<Activity>
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ActivityResponse {
    pub activity: Activity
}

// ---------- External ----------------- //

#[cw_serde]
pub enum ActivityMsg {
    VerifyActivity {
        activity_params: Binary,
        register_verify: bool
    }
}

#[cw_serde]
pub enum ActivityQuery {
    Name {},
    Score {}
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct NameResponse {
    pub activity_name: String
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ScoreResponse {
    pub activity_score: Uint128
}