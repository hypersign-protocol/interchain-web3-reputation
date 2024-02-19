use activity::{ActivityExecute, ActivityQuery};
use cosmwasm_std::{Deps, DepsMut, Env, Response, StdError, StdResult, Uint128};
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::{ssi::{get_blockchain_address, query_did_doc}, ContractError};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ActivityInfo {
    pub name: String,
    pub score: Uint128,
    pub description: String,
    pub threshold_balance: Uint128,
}

pub const ACTIVITY_INFO: Item<ActivityInfo> = Item::new("activity_info");

// pub const ACTIVITY_MAP: Map<String, bool> = Map::new("activity_map");

pub struct HypersignCoinHoldingsContract<'a> 
{
    pub activity_map: Map<'a, String, bool>,
}

impl<'a> Default for HypersignCoinHoldingsContract<'static>
{
    fn default() -> Self {
        Self { 
            activity_map: Map::new("activity_map"),
        }
    }
}

impl<'a> HypersignCoinHoldingsContract<'a>
{
    pub fn new(
        activity_map_key: &'a str,
    ) -> Self {
        Self { 
            activity_map: Map::new(activity_map_key)
        }
    }
}

impl<'a> ActivityExecute<ActivityParams> for HypersignCoinHoldingsContract<'a>
{   
    type Err = ContractError;

    fn perform_activity(
        &self,
        deps: DepsMut,
        env: Env,
        did_id: String,
        _activity_params: ActivityParams
    ) -> Result<Response, ContractError> {
        // Fetch DID Id using x/ssi hooks
        let did_doc = query_did_doc(deps.as_ref(), &did_id)
        .map_err(|_| {
            ContractError::Std(StdError::not_found(format!("DID Document '{}' not found", did_id)))
        })?;


        let wallet_address = get_blockchain_address(&did_doc);
        let denom: &str = "uhid";
        let activity_info = ACTIVITY_INFO.load(deps.storage).unwrap();
        let min_balance_threshold: Uint128 = activity_info.threshold_balance;
        let wallet_address_balance = deps.querier.query_balance(wallet_address, denom)?;

        if wallet_address_balance.amount.lt(&min_balance_threshold) {
            return Err(ContractError::Std(StdError::generic_err("criteria for activity not met")))
        } else {
            self.activity_map.save(deps.storage, did_id.clone(), &true)?;
            Ok(Response::new()
                .add_attribute("activity_performed_contract_addr", env.contract.address)
                .add_attribute("activity_performed_did_id", did_id.clone())
            )
        }
        } 
}



impl<'a> ActivityQuery for HypersignCoinHoldingsContract<'a>
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
pub struct ActivityParams {}