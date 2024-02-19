use cosmwasm_std::{to_json_binary, DepsMut, Env, IbcMsg, IbcTimeout, MessageInfo, Response, StdError};

use activity::{ActivityExecute, ActivityExecuteMsg};
use crate::state::{ActivityParams, OsmosisActivityContract};
use crate::{msg::IbcQueryMsg, ssi::get_blockchain_address, ContractError};

impl<'a> OsmosisActivityContract<'a> {
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