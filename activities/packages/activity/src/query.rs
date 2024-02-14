use cosmwasm_schema::cw_serde;
use cosmwasm_std::Uint128;

#[cw_serde]
pub enum ActivityQueryMsg {
    // Returns Activity Name
    Name {},

    // Returns Activity Score
    Score {},

    // Check if Activity executed by a DID Id is completed or not
    CheckActivityStatus{
        did_id: String
    },
}

#[cw_serde]
pub struct NameResponse {
    pub activity_name: String
}

#[cw_serde]
pub struct ScoreResponse {
    pub activity_score: Uint128
}

#[cw_serde]
pub struct CheckActivityStatusResponse {
    pub is_activity_completed: bool
}