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
      <div class="m-4 card-body">
      <div class="accordion" id="myAccordion-${activityPos}">
          <div class="accordion-item">
              <h2 class="accordion-header" id="heading-${activityPos}">
                  <button type="button" class="accordion-button collapsed headerBtn" data-bs-toggle="collapse" data-bs-target="#collapse-${activityPos}">
                    <span class="nameSpan"><i class="fa fa-tasks" aria-hidden="true"></i>  <b>${activityList[i]["name"]}</b></span>
                    <span id="check-icon-${activityPos}" class="checkIconSpan"><i class="fas fa-check"></i></span>
                  </button>                                    
              </h2>
              <div id="collapse-${activityPos}" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div class="card-body">
                      <!-- Add Description which would come from Activity Contract -->
                  </div>
              </div>
      </div>
   
      </div>
    </div>
     `
    } else {
      activityHtml = `
      <div class="m-4 card-body">
      <div class="accordion" id="myAccordion-${activityPos}">
          <div class="accordion-item">
              <h2 class="accordion-header" id="heading-${activityPos}">
                  <button type="button" class="accordion-button collapsed headerBtn" data-bs-toggle="collapse" data-bs-target="#collapse-${activityPos}">
                    <span class="nameSpan"><i class="fa fa-tasks" aria-hidden="true"></i>  <b>${activityList[i]["name"]}</b></span>
                    <span class="scoreSpan">
                    <ul style="list-style: none; display: block; text-align: center;">
                        <li><i data-v-6388b9fd="" class="fa fa-trophy"></i></li>
                        <li style="font-size: 12px;">${activityList[i]["score"]}</li>
                    </ul>
                    </span>
                    <span id="check-icon-${activityPos}" class="checkIconSpan"></span>
                  </button>                                    
              </h2>
              <div id="collapse-${activityPos}" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div class="card-body">
                      <!-- Add Description which would come from Activity Contract -->
                      <div class="col-sm-4 text-right">
                        <button  
                          class="btn btn-outline-primary verify-btn activity-verify-btn" data-activity-index="${activityPos}"
                          style="margin-left: 128%; margin-top: 5%;"
                        >Verify</button><br><br>
                      </div>
                  </div>
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

export function populateActivities2(htmlElem, activityList, activitiesAlreadyDone) {
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

