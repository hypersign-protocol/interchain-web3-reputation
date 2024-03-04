use anybuf::Anybuf;
use cosmwasm_std::{from_json, to_json_vec, Binary, ContractResult, CustomQuery, Deps, QueryRequest, StdError, StdResult, SystemResult};
use osmosis_std::types::osmosis::concentratedliquidity::v1beta1::ConcentratedliquidityQuerier;
use schemars::JsonSchema;
use serde::{de::DeserializeOwned, Serialize, Deserialize};

use crate::msg::UserPositionsResponse;


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum OsmosisQuery {
    UserPositionExists {
        address: String,
        pool_id: u64
    },
}

impl CustomQuery for OsmosisQuery {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct UserPositionExistsResponse {
    pub result: bool
}

fn create_data(user_address: String, pool_id: u64 ) -> Binary {
    Binary(
        Anybuf::new()
        .append_string(1, user_address)
        .append_uint64(2, pool_id)
        .into_vec()
    )
}

pub fn query_user_positions(deps: Deps, address: String, pool_id: u64) -> StdResult<UserPositionExistsResponse> {
    let user_position_response: UserPositionsResponse = deps.querier.query(&QueryRequest::Stargate { 
        path: "/osmosis.concentratedliquidity.v1beta1.Query/UserPositions".to_string(), 
        data: create_data(address.clone(), pool_id.clone())
    })?;

    
    if user_position_response.positions.len() > 0 {
        Ok( UserPositionExistsResponse {
            result: true
        })
    } else {
        Ok( UserPositionExistsResponse {
            result: false
        })
    }
}
