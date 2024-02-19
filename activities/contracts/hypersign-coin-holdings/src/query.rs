use activity::{ActivityQuery, ActivityQueryMsg};
use cosmwasm_std::{to_json_binary, Binary, Deps, Env, StdResult};

use crate::{msg::{DidResponse, NameResponse, ScoreResponse}, state::{HypersignCoinHoldingsContract, ACTIVITY_INFO}};

impl<'a> HypersignCoinHoldingsContract<'a> {
    pub fn query(
        &self,
        deps: Deps,
        _env: Env,
        msg: ActivityQueryMsg
    ) -> StdResult<Binary> {
        match msg {
            ActivityQueryMsg::Name {  } => to_json_binary(&self.name(deps)?),
            ActivityQueryMsg::Score {  } => to_json_binary(&self.score(deps)?),
            ActivityQueryMsg::Description {  } => to_json_binary(&self.description(deps)?),
            ActivityQueryMsg::CheckActivityStatus { did_id } => to_json_binary(&self.check_activity_status(deps, did_id)?)
        }
    }
}