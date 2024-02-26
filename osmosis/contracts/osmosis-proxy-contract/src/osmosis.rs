use cosmwasm_std::{CustomQuery, QueryRequest, Deps, StdResult, to_json_vec, StdError, SystemResult, ContractResult, from_json};
use osmosis_std::types::osmosis::concentratedliquidity::v1beta1::ConcentratedliquidityQuerier;
use schemars::JsonSchema;
use serde::{de::DeserializeOwned, Serialize, Deserialize};


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


pub fn query_user_positions(deps: Deps, address: String, pool_id: u64) -> StdResult<UserPositionExistsResponse> {
    let stargate_query_result =  ConcentratedliquidityQuerier::new(&deps.querier).user_positions(address, pool_id, None);
    
    let resp = match stargate_query_result {
        Ok(r) => r,
        Err(e) => return Err(e),
    };

    if resp.positions.len() > 0 {
        Ok( UserPositionExistsResponse {
            result: true
        })
    } else {
        Ok( UserPositionExistsResponse {
            result: false
        })
    }
}
