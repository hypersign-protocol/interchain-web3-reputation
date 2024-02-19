use cosmwasm_std::{Binary, Deps, DepsMut, Env, Response, StdResult};

use crate::query::{CheckActivityStatusResponse, DescriptionResponse, NameResponse, ScoreResponse};


pub trait ActivityExecute<T>
{
    type Err: ToString;

    fn perform_activity(
        &self,
        deps: DepsMut,
        env: Env,
        did_id: String,
        activity_params: T
    ) -> Result<Response, Self::Err>;
}

pub trait ActivityQuery {
    fn name(
        &self,
        deps: Deps
    ) -> StdResult<NameResponse>;

    fn score(
        &self,
        deps: Deps
    ) -> StdResult<ScoreResponse>;

    fn description(
        &self,
        deps: Deps
    ) -> StdResult<DescriptionResponse>;

    fn check_activity_status(
        &self,
        deps: Deps,
        did_id: String,
    ) -> StdResult<CheckActivityStatusResponse>;
}
