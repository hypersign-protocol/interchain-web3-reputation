use cosmwasm_schema::{cw_serde, QueryResponses};
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {}

#[cw_serde]
pub enum IbcQueryMsg {
    Verify {
        did_id: String,
        user_address: String,
        nft_collection_id: String,
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(IsOwnerOfNftResponse)]
    HasNftOfCollection {
        user_address: String,
        nft_collection_id: String
    }
}

#[cw_serde]
pub enum CwQuery {
    Tokens {
        owner: String,
        start_after: Option<String>,
        limit: Option<u32>,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct IsOwnerOfNftResponse {
    pub result: bool
}

