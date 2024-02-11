use cosmwasm_std::{CustomQuery, QueryRequest, Deps, StdResult, to_json_vec, StdError, SystemResult, ContractResult, from_json};
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
    let request = QueryRequest::Custom(OsmosisQuery::UserPositionExists 
        { 
            address: address.into(), 
            pool_id: pool_id.into()
        });

    let _: UserPositionExistsResponse = match query(deps, &request) {
        Err(e) => {
            return Err(e)
        },      
        Ok(res) => {
            return Ok(res)
        }
    };
    
}

fn query<U: DeserializeOwned>(deps: Deps, request: &QueryRequest<OsmosisQuery>) -> StdResult<U> {
    let raw = to_json_vec(request).map_err(|serialize_err| {
        StdError::generic_err(format!("Serializing QueryRequest: {serialize_err}"))
    })?;
    match deps.querier.raw_query(&raw) {
        SystemResult::Err(system_err) => Err(StdError::generic_err(format!(
            "Querier system error: {system_err}"
        ))),
        SystemResult::Ok(ContractResult::Err(contract_err)) => Err(StdError::generic_err(
            format!("Querier contract error: {contract_err}"),
        )),
        SystemResult::Ok(ContractResult::Ok(value)) => from_json(value),
    }
}
