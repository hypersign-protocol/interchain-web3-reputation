use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Binary;
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
        denom_id: String,
        nft_token_id: String
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(IsOwnerOfNftResponse)]
    IsOwnerOfNft {
        user_address: String,
        denom_id: String,
        nft_token_id: String
    }
}

#[cw_serde]
pub struct QueryOwnerONFTsResponse {
    pub owner: Owner,
    pub pagination: Pagination 
}

#[cw_serde]
pub struct Pagination {
    pub next_key: Option<Binary>,
    pub total: String
}

#[cw_serde]
pub struct Owner {
    pub address: String,
    pub id_collections: Vec<IDCollection>
}

#[cw_serde]
pub struct IDCollection {
    pub denom_id: String,
    pub onft_ids: Vec<String>
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct IsOwnerOfNftResponse {
    pub result: bool
}

