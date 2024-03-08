use activity::{ActivityExecute, ActivityExecuteMsg};
use cosmwasm_std::{Deps, DepsMut, Env, MessageInfo, Response, StdError, Uint128};

use crate::{state::{ActivityParams, HypersignCoinHoldingsContract, ACTIVITY_INFO}, ContractError};
// state: (wallet address <> LP provided yes or no?)


impl<'a> HypersignCoinHoldingsContract<'a> {
    pub fn execute(
        &self,
        deps: DepsMut,
        env: Env,
        _info: MessageInfo,
        msg: ActivityExecuteMsg<ActivityParams>
    ) -> Result<Response, ContractError> {
        match msg {
            ActivityExecuteMsg::PerformActivity { 
                did_id, 
                activity_params 
            } => self.perform_activity(deps, env, did_id, activity_params)
        }
    }
}
