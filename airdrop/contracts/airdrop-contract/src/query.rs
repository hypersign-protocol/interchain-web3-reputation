use cosmwasm_std::{StdResult, Deps, Env, BalanceResponse};

use crate::msg::AirdropInfoResponse;
use crate::msg::AirdroppedAddressesResponse;
use crate::msg::ExternalMsg;
use crate::msg::QueryScoreResponse;
use crate::state::AIRDROP_CONFIG;
use crate::{msg::{GetAirdropStatusResponse, EligibityResponse}, state::AIRDROP_STORE};

pub fn query_contract_balance(deps: Deps, env: Env) -> StdResult<BalanceResponse> {
    let balance = deps.querier.query_balance(env.contract.address, "uhid")?;
    Ok(BalanceResponse{ amount: balance })
}

pub fn query_airdrop_info(deps: Deps) -> StdResult<AirdropInfoResponse> {
    let airdrop_config = AIRDROP_CONFIG.load(deps.storage).unwrap();

    Ok(AirdropInfoResponse {
        threshold_score: airdrop_config.threshold_score,
        airdrop_amount: airdrop_config.airdrop_amount
    })
}

pub fn query_airdrop_addresses(deps: Deps) -> StdResult<AirdroppedAddressesResponse> {
    let mut addresses: Vec<String> = vec![] ;
    
    for address in AIRDROP_STORE.keys(deps.storage, None, None, cosmwasm_std::Order::Ascending) {
        match address {
            Err(e) => return Err(e),
            Ok(addr) => {
                addresses.push(addr)
            }
        }
    };
    
    Ok(AirdroppedAddressesResponse {
        addresses
    })
}

pub fn query_airdrop_status_for_address(deps: Deps, address: String) -> StdResult<GetAirdropStatusResponse> {
    let has_address_received_airdrop = AIRDROP_STORE.may_load(deps.storage, &address)?;
    if has_address_received_airdrop.is_none() {
        Ok(GetAirdropStatusResponse { result: false })
    } else {
        Ok(GetAirdropStatusResponse { result: true })
    }
}

pub fn query_airdrop_eligibility(deps: Deps, address: String, reputation_contract_addr: String) -> StdResult<EligibityResponse> {
    // Fetch Score for address
    let reputation_contract_response: StdResult<QueryScoreResponse> = deps.querier.query_wasm_smart(
        reputation_contract_addr.clone(), 
        &ExternalMsg::QueryScoreByAddress { user_address: address.clone() }
    );
    let user_score = reputation_contract_response.unwrap().score;

    let threshold_score = AIRDROP_CONFIG.load(deps.storage).unwrap().threshold_score;

    if user_score.lt(&threshold_score) {
        Ok(EligibityResponse {
            result: false
        })
    } else {
        Ok(EligibityResponse {
            result: true
        })
    }
}