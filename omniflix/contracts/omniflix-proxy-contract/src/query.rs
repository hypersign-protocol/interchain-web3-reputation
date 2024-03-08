use anybuf::Anybuf;
use cosmwasm_std::{Binary, Deps, QueryRequest, StdError, StdResult};

use crate::msg::{IDCollection, IsOwnerOfNftResponse, QueryOwnerONFTsResponse};

fn create_data(denom_id: String, user_address: String ) -> Binary {
    Binary(
        Anybuf::new()
        .append_string(1, denom_id)
        .append_string(2, user_address)
        .into_vec()
    )
}

pub fn query_user_ownership_of_nft(
    deps: Deps, 
    user_address: String, 
    denom_id: String,
) -> StdResult<IsOwnerOfNftResponse> {
    let response: QueryOwnerONFTsResponse = deps.querier.query(&QueryRequest::Stargate { 
        path: "/OmniFlix.onft.v1beta1.Query/OwnerONFTs".to_string(), 
        data: create_data(denom_id.clone(), user_address)
    })?;

    if response.owner.id_collections.len() == 0 {
        return Ok( IsOwnerOfNftResponse { result: false } );
    }

    // Check if denom/collection exists
    let mut collection: IDCollection = IDCollection { denom_id: "".to_string(), onft_ids: vec![] };
    let mut collection_found = false;
    for id_collection in response.owner.id_collections.into_iter() {
        if id_collection.denom_id.eq(&denom_id) {
            collection = id_collection;
            collection_found  = true;
            break
        }
    }
 
    if !collection_found {
        Ok( IsOwnerOfNftResponse { result: false } )
    } else {
        Ok( IsOwnerOfNftResponse { result: true } )
    }

}

