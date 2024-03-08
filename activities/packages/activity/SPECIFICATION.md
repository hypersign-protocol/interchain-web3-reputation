# Activity package specification

This package provides a set of standardized methods and enums which can be utilized to build Activity CosmWasm smart contracts.

## Enums

Following are the enums which the developers must implement:

`ActivityExecuteMsg` - These are execution based enums. It has a generic `T` which lets developers to extend the `activity_params` attribute by including fields which are based on the use-case of the Activity contract

```rs
pub enum ActivityExecuteMsg<T>
{
    PerformActivity {
        did_id: String,
        activity_params: T
    }
}
```

`ActivityQueryMsg` - These are query based enums. There are basic information which a contract should have such as Contract name, contract score and conract description, along with the ability to check where a `did_id` has completed the activity or not.

```rs
pub enum ActivityQueryMsg {
    // Returns Activity Name
    Name {},

    // Returns Activity Score
    Score {},

    // Returns Activity Description
    Description {},

    // Check if Activity executed by a DID Id is completed or not
    CheckActivityStatus{
        did_id: String
    },
}
```

## Traits

Execute and Query based traits enforce function definitions for developers to extend and write their own logic within these functions

- `ActivityExecute`

```rs
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
```

- `ActivityQuery`

```rs
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
```
## Implementation Example

