use cosmwasm_std::{Deps, StdError, StdResult};
use cw721::OwnerOfResponse;

use crate::msg::{CwQuery, IsOwnerOfNftResponse};

pub fn query_user_ownership_of_nft(
    deps: Deps, 
    user_address: String, 
    nft_collection_id: String, 
    nft_token_id: String
) -> StdResult<IsOwnerOfNftResponse> {
    let request: Result<OwnerOfResponse, StdError> = match deps.querier.query_wasm_smart(
        nft_collection_id,
        &CwQuery::OwnerOf { token_id: nft_token_id, include_expired: None }
    ) {
        Err(e) => {
            return Ok( IsOwnerOfNftResponse { result: false })
        },      
        Ok(res) => {
            Ok(res)
        }
    };

    let owner_of_nft = request.unwrap().owner;

    if user_address.eq(&owner_of_nft) {
        Ok( IsOwnerOfNftResponse { result: true })
    } else {
        Ok( IsOwnerOfNftResponse { result: false })
    }
}

