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
        nft_token_id: String
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(IsOwnerOfNftResponse)]
    IsOwnerOfNft {
        user_address: String,
        nft_collection_id: String,
        nft_token_id: String
    }
}

#[cw_serde]
pub enum CwQuery {
    OwnerOf {
        token_id: String,
        /// unset or false will filter out expired approvals, you must set to true to see them
        include_expired: Option<bool>,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct IsOwnerOfNftResponse {
    pub result: bool
}

