use cosmwasm_std::{Deps, StdError, StdResult};
use cw721::TokensResponse;

use crate::msg::{CwQuery, IsOwnerOfNftResponse};

pub fn query_has_nft_of_a_collection(
    deps: Deps, 
    user_address: String, 
    nft_collection_id: String
) -> StdResult<IsOwnerOfNftResponse> {
    let request: Result<TokensResponse, StdError> = match deps.querier.query_wasm_smart(
        nft_collection_id,
        &CwQuery::Tokens { owner: user_address, start_after: None, limit: None }
    ) {
        Err(e) => {
            return Ok( IsOwnerOfNftResponse { result: false })
        },      
        Ok(res) => {
            Ok(res)
        }
    };

    let token_list = request.unwrap().tokens;

    if token_list.len() > 0 {
        Ok( IsOwnerOfNftResponse { result: true })
    } else {
        Ok( IsOwnerOfNftResponse { result: false })
    }
}

