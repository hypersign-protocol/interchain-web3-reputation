use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

#[cw_serde]
pub struct InstantiateMsg {
    pub activity_manager_contract_address: String
}

#[cw_serde]
pub enum ExecuteMsg {}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(QueryScoreResponse)]
    QueryScoreByDidId {
        did_id: String
    },

    #[returns(QueryScoreResponse)]
    QueryScoreByAddress {
        user_address: String
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct QueryScoreResponse {
    pub user_did: String,
    pub score: Uint128,
    pub score_breakdown: ScoreDetails
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ScoreDetails {
    pub activities: Vec<Activity>
}

// Note: In the future, once the task contract is made a library/dependency,
// the following struct must be imported, rather than being redefined here
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Activity {
    pub id: String,
    pub name: String,
    pub score: Uint128,
    pub description: String,
}

//  ---------------- External Contract ---------------- //

// ----- Fetching Activities from DID Id ---- //
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExternalQuery {
    ActivitiesByDidId {
        did_id: String
    },
    Activity {
        id: String
    },
    DidIdByAddress {
        address: String
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct ActivitiesByDidIdResponse {
    pub activities: Vec<Activity>
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct ActivityByIdResponse {
    pub activity: Activity
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct DidIdByAddressResponse {
    pub did_id: String
}
