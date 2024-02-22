use cosmwasm_std::{Deps, Empty, StdError, StdResult};
use cw721_base::QueryMsg;
use cw721::OwnerOfResponse;

use crate::msg::IsOwnerOfNftResponse;

pub fn query_user_ownership_of_nft(
    deps: Deps, 
    user_address: String, 
    nft_collection_id: String, 
    nft_token_id: String
) -> StdResult<IsOwnerOfNftResponse> {
    let request: Result<OwnerOfResponse, StdError> = match deps.querier.query_wasm_smart(
        nft_collection_id,
        &QueryMsg::<Empty>::OwnerOf { token_id: nft_token_id, include_expired: None }
    ) {
        Err(e) => {
            return Err(e)
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

