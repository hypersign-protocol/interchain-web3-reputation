use cosmwasm_std::{CustomQuery, QueryRequest, Deps, StdResult, to_json_vec, StdError, SystemResult, ContractResult, from_json};
use schemars::JsonSchema;
use serde::{de::DeserializeOwned, Serialize, Deserialize};


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum SsiQuery {
    // The enum definition MUST match with Bindings defined in `wasmbinding/bindings/query.go` in hid-node
    DidDocument {
        did_id: String,
    },
    DidDocumentFromAddress {
        address: String,
    }
}

impl CustomQuery for SsiQuery {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct QueryDidDocumentFromAddressResponse {
    pub did_id: String
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct DidDoc {
    pub context: Vec<String>,
    pub id: String,
	pub controller: Vec<String>,
	pub alsoKnownAs: Option<Vec<String>>,
	pub verificationMethod: Vec<VerificationMethod>,
	pub authentication: Option<Vec<String>>,
	pub assertionMethod: Option<Vec<String>>,
	pub keyAgreement: Option<Vec<String>>,
	pub capabilityInvocation: Option<Vec<String>>,
	pub capabilityDelegation: Option<Vec<String>>,
	pub service: Option<Vec<Service>>,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct VerificationMethod {
    pub id: String,
    pub r#type: String,
    pub controller: String,
    pub publicKeyMultibase: String,
    pub blockchainAccountId: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Service {
    pub id: String,
    pub r#type: String,
    pub serviceEndpoint: String
}

pub fn query_did_doc(deps: Deps, did_id: &String) -> StdResult<DidDoc> {
    let request = QueryRequest::Custom(SsiQuery::DidDocument {
        did_id: did_id.into()
    });

    let res: DidDoc = query(deps, &request)?;
    Ok(res)
}

pub fn query_did_id_from_address(deps: Deps, address: &String) -> StdResult<QueryDidDocumentFromAddressResponse> {
    let request = QueryRequest::Custom(SsiQuery::DidDocumentFromAddress {
        address: address.into()
    });

    let _: QueryDidDocumentFromAddressResponse = match query(deps, &request) {
        Err(_) => {
            return Ok(QueryDidDocumentFromAddressResponse { did_id: "".to_string() })
        },      
        Ok(res) => {
            return Ok(res)
        }
    };
    
}

fn query<U: DeserializeOwned>(deps: Deps, request: &QueryRequest<SsiQuery>) -> StdResult<U> {
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
