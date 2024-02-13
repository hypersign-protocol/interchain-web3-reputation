import { smartContractQueryRPC } from './smartContract';
import { findAlreadyDoneActivities as isActivityDone } from './utils';

/**
  var activityHtml = `
        <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-8">
              <p class="card-title">Id: <span id="activity${activityPos}contractaddr"></span></p>
              <h5 class="card-title">Name: <span id="activity${activityPos}name"></span></h5>
              <b class="card-title">Score: <span id="activity${activityPos}score"></span></b>
            </div>
            <div class="col-sm-4 text-right">
              <button class="btn btn-success verify-btn" id="activity${activityPos}verify">Verify</button>
            </div>
          </div>
        </div>
      </div>
    `
 */
export function populateActivities(htmlElem, activityList, activitiesAlreadyDone) {
  let activityIdx = {};

  htmlElem.innerHTML = null;
  for (var i = 0; i < activityList.length; i++) {
    var activityPos = i + 1;
    var activityHtml = null;

    if (isActivityDone(activitiesAlreadyDone, activityList[i])) {
      activityHtml = `
        <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-8">
              <p class="card-title">Id: ${activityList[i]["id"]}</p>
              <h5 class="card-title">Name: ${activityList[i]["name"]}</h5>
              <b class="card-title">Score: ${activityList[i]["score"]}</b>
            </div>
            <div class="col-sm-4 text-right">
              <button class="btn btn-success verify-btn activity-verify-btn" data-activity-index="${activityPos}" disabled><i class="fas fa-check"></i></button>
            </div>
          </div>
        </div>
      </div>
     `
    } else {
      activityHtml = `
        <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-8">
              <p class="card-title">Id: ${activityList[i]["id"]}</p>
              <h5 class="card-title">Name: ${activityList[i]["name"]}</h5>
              <b class="card-title">Score: ${activityList[i]["score"]}</b>
            </div>
            <div class="col-sm-4 text-right">
              <button class="btn btn-success verify-btn activity-verify-btn" data-activity-index="${activityPos}">Execute</button><br><br>
              <button class="btn btn-success verify-btn activity-reload-btn" data-activity-index="${activityPos}">Reload</button>
            </div>
          </div>
        </div>
      </div>
    `
    }

    htmlElem.innerHTML += activityHtml
    activityIdx[activityPos] = activityList[i]["id"]
  }
  console.log(activityIdx)

  return activityIdx;
}

