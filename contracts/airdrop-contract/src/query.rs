use cosmwasm_std::{StdResult, Deps, Env, BalanceResponse};
use reputation_engine_contract::msg::QueryScoreResponse;
use reputation_engine_contract::msg::QueryMsg as ReputationQueryMsg;

use crate::state::AIRDROP_CONFIG;
use crate::{msg::{GetAirdropStatusResponse, EligibityResponse}, state::AIRDROP_STORE};

pub fn query_contract_balance(deps: Deps, env: Env) -> StdResult<BalanceResponse> {
    let balance = deps.querier.query_balance(env.contract.address, "uhid")?;
    Ok(BalanceResponse{ amount: balance })
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
        &ReputationQueryMsg::QueryScoreByAddress { user_address: address.clone() }
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