use cosmwasm_std::{to_json_binary, DepsMut, Env, IbcMsg, IbcTimeout, MessageInfo, Response, StdError};

use activity::{ActivityExecute, ActivityExecuteMsg};
use crate::state::{ActivityParams, StargazeActivityContract};
use crate::{msg::IbcQueryMsg, ContractError};

impl<'a> StargazeActivityContract<'a> {
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
