use cosmwasm_schema::{cw_serde, QueryResponses};
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {}

#[cw_serde]
pub enum IbcQueryMsg {
    Verify {
        did_id: String,
        wallet_address: String,
        pool_id: u64
    }
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(HasLiquidityPositionResponse)]
    HasLiquidityPosition {
        address: String,
        pool: u64
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct HasLiquidityPositionResponse {
    pub result: bool
}

