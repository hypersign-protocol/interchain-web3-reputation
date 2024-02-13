use cosmwasm_std::{to_json_binary, DepsMut, Env, IbcMsg, IbcTimeout, Response, StdError};

use crate::{msg::IbcQueryMsg, ssi::get_blockchain_address, ContractError};
use crate::ssi::query_did_doc;


pub fn execute_perform_activity(deps: DepsMut, env: Env, did_id: String, pool_id: u64, ibc_channel: String) -> Result<Response, ContractError> {
    // Fetch DID Id using x/ssi hooks
    let did_doc = query_did_doc(deps.as_ref(), &did_id)
    .map_err(|_| {
        ContractError::Std(StdError::not_found(format!("DID Document '{}' not found", did_id)))
    })?;

    let wallet_address = get_blockchain_address(&did_doc);

    Ok(Response::new()
        .add_attribute("channel", ibc_channel.clone())
        .add_message(IbcMsg::SendPacket { 
            channel_id: ibc_channel.clone(), 
            data: to_json_binary(&IbcQueryMsg::Verify { wallet_address, pool_id, did_id })?, 
            timeout: IbcTimeout::with_timestamp(env.block.time.plus_seconds(120))
        }
    ))    
}

