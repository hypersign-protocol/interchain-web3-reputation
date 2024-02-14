use cosmwasm_std::{to_json_binary, Binary, Deps, Env, StdError, StdResult};
use activity::{ActivityQuery, ActivityQueryMsg};
use crate::{msg::{CheckActivityStatusResponse, NameResponse, ScoreResponse}, state::{OsmosisActivityContract, ACTIVITY_INFO}, ContractError};


impl<'a> OsmosisActivityContract<'a> {
    pub fn query(
        &self,
        deps: Deps,
        _env: Env,
        msg: ActivityQueryMsg
    ) -> StdResult<Binary> {
        match msg {
            ActivityQueryMsg::Name {  } => to_json_binary(&self.name(deps)?),
            ActivityQueryMsg::Score {  } => to_json_binary(&self.score(deps)?),
            ActivityQueryMsg::CheckActivityStatus { did_id } => to_json_binary(&self.check_activity_status(deps, did_id)?)
        }
    }
}
