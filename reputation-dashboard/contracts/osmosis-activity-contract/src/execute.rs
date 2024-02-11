use cosmwasm_std::{from_json, to_json_binary, Binary, Deps, DepsMut, Env, Event, IbcMsg, IbcTimeout, Response, StdError, Uint128};

use crate::{msg::IbcQueryMsg, ssi::get_blockchain_address, state::{ActivityParams, ACTIVITY_INFO, ACTIVITY_MAP}, ContractError};
use crate::ssi::query_did_doc;


pub fn execute_verify_activity(deps: DepsMut, env: Env, activity_params: Binary, register_verify: bool) -> Result<Response, ContractError> {
    // If the following is true, it means that the Activity Manger contract wants to test
    // this function's existence, but full execute it. The error thrown is expected and will
    // be considered as signal to move forward with Contract Registeration on Activity Manager
    // Contract end
    if register_verify {
        Ok(Response::new()
            .add_event(Event::new("wasm").add_attribute("activity_verification", env.contract.address)))
    } else {
        // Deserialise Activity Params
        let params: ActivityParams = match from_json(&activity_params) {
            Ok(r) => r,
            Err(e) => return Err(ContractError::Std(e))
        };

        // Extract Params
        let did_id = params.did_id;
        let ibc_channel = params.ibc_channel;
        let pool_id = params.pool_id;

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
    
}

