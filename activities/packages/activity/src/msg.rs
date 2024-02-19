use cosmwasm_schema::cw_serde;
use cosmwasm_std::Binary;

#[cw_serde]
pub enum ActivityExecuteMsg<T>
{
    PerformActivity {
        did_id: String,
        activity_params: T
    }
}