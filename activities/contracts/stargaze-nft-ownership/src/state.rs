use std::marker::PhantomData;

use activity::{ActivityExecute, ActivityQuery};
use cosmwasm_std::{from_json, to_json_binary, Binary, Deps, DepsMut, Env, IbcMsg, IbcTimeout, Response, StdError, StdResult, Uint128};
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{de::DeserializeOwned, Deserialize, Serialize};

use crate::{msg::{CheckActivityStatusResponse, IbcQueryMsg, NameResponse, ScoreResponse}, ssi::{get_blockchain_address, query_did_doc}, ContractError};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ActivityInfo {
    pub name: String,
    pub score: Uint128,
    pub description: String,
}

pub const ACTIVITY_INFO: Item<ActivityInfo> = Item::new("activity_info");

pub struct StargazeActivityContract<'a> 
{
    pub activity_map: Map<'a, String, bool>,
}

impl<'a> Default for StargazeActivityContract<'static>
{
    fn default() -> Self {
        Self { 
            activity_map: Map::new("activity_map"),
        }
    }
}

impl<'a> StargazeActivityContract<'a>
{
    pub fn new(
        activity_map_key: &'a str,
    ) -> Self {
        Self { 
            activity_map: Map::new(activity_map_key)
        }
    }
}

impl<'a> ActivityExecute<ActivityParams> for StargazeActivityContract<'a>
{   
    type Err = ContractError;

    fn perform_activity(
        &self,
        deps: DepsMut,
        env: Env,
        did_id: String,
        activity_params: ActivityParams
    ) -> Result<Response, ContractError> {
        let ibc_channel = activity_params.ibc_channel;
        let nft_collection_id = activity_params.nft_collection_id;
        let nft_token_id = activity_params.nft_token_id;

        // Fetch DID Id using x/ssi hooks
        let did_doc = query_did_doc(deps.as_ref(), &did_id)
        .map_err(|_| {
            ContractError::Std(StdError::not_found(format!("DID Document '{}' not found", did_id)))
        })?;

        let user_address = get_blockchain_address(&did_doc);

        Ok(Response::new()
            .add_attribute("channel", ibc_channel.clone())
            .add_message(IbcMsg::SendPacket { 
                channel_id: ibc_channel.clone(), 
                data: to_json_binary(&IbcQueryMsg::Verify { user_address, nft_collection_id, nft_token_id, did_id })?, 
                timeout: IbcTimeout::with_timestamp(env.block.time.plus_seconds(120))
            }
        ))
    } 
}

impl<'a> ActivityQuery for StargazeActivityContract<'a>
{
    fn name(
        &self,
        deps: Deps
    ) -> StdResult<activity::NameResponse> {
        let activity_info = ACTIVITY_INFO.load(deps.storage)?;
        Ok(activity::NameResponse { activity_name: activity_info.name })
    }

    fn score(
        &self,
        deps: Deps
    ) -> StdResult<activity::ScoreResponse> {
        let activity_info = ACTIVITY_INFO.load(deps.storage)?;
        Ok(activity::ScoreResponse { activity_score: activity_info.score })
    }

    fn description(
            &self,
            deps: Deps
        ) -> StdResult<activity::DescriptionResponse> {
        let activity_info = ACTIVITY_INFO.load(deps.storage)?;
        Ok(activity::DescriptionResponse { activity_description: activity_info.description })
    }

    fn check_activity_status(
        &self,
        deps: Deps,
        did_id: String,
    ) -> StdResult<activity::CheckActivityStatusResponse> {
        let is_activity_completed =  self.activity_map.has(deps.storage, did_id);
        Ok(activity::CheckActivityStatusResponse { is_activity_completed })
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ActivityParams {
    pub nft_collection_id: String,
    pub nft_token_id: String,
    pub ibc_channel: String,
}