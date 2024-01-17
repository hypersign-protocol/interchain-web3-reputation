// pub fn is_activity_done_by_did_id(deps: Deps, did_id: &str, activity_id: u64) -> bool {
//     match DID_ACTIVITY_MAP.load(deps.storage, did_id.to_string()) {
//         Ok(activities) => {
//             for activity in activities.iter() {
//                 if activity_id.eq(activity) {
//                     return true
//                 }
//             }
//             return false;
//         },
//         Err(_) => return false
//     }
// }
