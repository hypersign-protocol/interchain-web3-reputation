use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Uint128, Coin};
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, Default, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct BalanceResponse {
    /// Always returns a Coin with the requested denom.
    /// This may be of 0 amount if no such funds.
    pub amount: Coin,
}

#[cw_serde]
pub struct InstantiateMsg {
    pub threshold_score: Uint128,
    pub airdrop_amount: Uint128
}

#[cw_serde]
pub enum ExecuteMsg {
    // Get 10 HID airdrop
    ClaimAirdrop {
        user_address: String,
        reputation_contract_adress: String,
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(BalanceResponse)]
    GetContractBalance {},

    #[returns(GetAirdropStatusResponse)]
    GetAirdropStatus {
        address: String
    },

    #[returns(EligibityResponse)]
    Eligibity {
        address: String,
        reputation_contract_address: String,
    },

    #[returns(AirdroppedAddressesResponse)]
    AirdroppedAddresses {},

    #[returns(AirdropInfoResponse)]
    AirdropInfo {}
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct AirdropInfoResponse {
    pub threshold_score: Uint128,
    pub airdrop_amount: Uint128
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct GetAirdropStatusResponse {
    pub result: bool // for debugging only
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct AirdroppedAddressesResponse {
    pub addresses: Vec<String>
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct EligibityResponse {
    pub result: bool // for debugging only
}


// External (Todo: Remove it once they are made dependencies)

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExternalMsg {
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

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Activity {
    pub id: String,
    pub name: String,
    pub score: Uint128,
}