mod traits;
mod query;
mod msg;
mod ssi;

pub use crate::traits::{ActivityExecute, ActivityQuery};
pub use crate::query::{ActivityQueryMsg, NameResponse, ScoreResponse, CheckActivityStatusResponse, DescriptionResponse};
pub use crate::msg::ActivityExecuteMsg;
pub use crate::ssi::{get_blockchain_address, query_did_doc, query_did_id_from_address};