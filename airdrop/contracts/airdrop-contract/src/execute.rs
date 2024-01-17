use cosmwasm_std::{Response, Uint128, StdError, BankMsg, Coin, DepsMut};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use crate::{ContractError, state::{AIRDROP_STORE, AIRDROP_CONFIG}, query::query_airdrop_eligibility};


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct GetScoreResponse {
    pub score: Uint128
}

// -------------------------------------------- //

pub fn execute_claim_airdrop(
    deps: DepsMut, 
    reputation_contract_addr: String,
    user_address: String,
) -> Result<Response, ContractError> {
    let airdrop_config = AIRDROP_CONFIG.load(deps.as_ref().storage).unwrap();
    let threshold_score = airdrop_config.threshold_score;
    let airdrop_amount = airdrop_config.airdrop_amount.u128();
    let airdrop_amount_in_hid = airdrop_config.airdrop_amount.u128().abs_diff(1000000);

    // Check if the address has already recieved the airdrop
    let has_address_received_airdrop = AIRDROP_STORE.may_load(deps.as_ref().storage, &user_address)?;
    if has_address_received_airdrop.is_some() {
        return Err(ContractError::Std(StdError::generic_err(format!("{} has already received the {} HID airdrop", &user_address, &airdrop_amount_in_hid))));
    }
    

    // Check airdrop eligibility
    let is_user_eligible_for_aidrop = query_airdrop_eligibility(
        deps.as_ref(), user_address.clone(), reputation_contract_addr).unwrap().result;
    
    if !is_user_eligible_for_aidrop {
        return Err(ContractError::Std(StdError::generic_err(format!("score is below the threshold score of {}, cannot claim airdrop", threshold_score))));
    } else {
        let msg_token_send = BankMsg::Send { 
            to_address: user_address.clone(),
            amount: vec![Coin::new(airdrop_amount, "uhid")]
        };

        AIRDROP_STORE.save(deps.storage, &user_address, &true)?;

        Ok(Response::new()
            .add_message(msg_token_send)
            .add_attribute("airdrop_account", user_address.clone())
            .add_attribute("airdrop_amount", airdrop_amount.clone().to_string())
        )
    }

}