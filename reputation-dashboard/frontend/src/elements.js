import { checkIfContractExistsInList, hypersignBalanceActivityContracts, osmosisLiquidityUserPositionContracts, smartContractQueryRPC, stargazeNftOwnershipContracts } from './smartContract';
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

function returnIconElementByChain(activityContractAddress) {
  if (checkIfContractExistsInList(hypersignBalanceActivityContracts, activityContractAddress)) {
    return '<span><img src="https://static.tildacdn.one/tild6464-6463-4136-b535-353636396131/Frame-24-_1_.ico"  width="30" height="30"></span>'
  } else if (checkIfContractExistsInList(osmosisLiquidityUserPositionContracts, activityContractAddress)) {
    return '<span><img src="https://assets-global.website-files.com/623a0c9828949e55356286f9/62548053f3fb883e5926a5cf_icon-32.png"></span>'
  } else if (checkIfContractExistsInList(stargazeNftOwnershipContracts, activityContractAddress)) {
    return '<span><img src="https://www.stargaze.zone/favicon.ico"></span>'
  } else {
    return ''
  }
}


// Return a span element with "IBC" text if the activity is of IBC type
function returnIbcIcon(activityContractAddress) {
  if (
    (checkIfContractExistsInList(osmosisLiquidityUserPositionContracts, activityContractAddress)) ||
    (checkIfContractExistsInList(stargazeNftOwnershipContracts, activityContractAddress))
  )  {
    return '<span class="badge badge-primary" style="color: black;">IBC</span>'
  } else {
    return ''
  }
}

export function populateActivities(htmlElem, activityList, activitiesAlreadyDone) {
  let activityIdx = {};

  htmlElem.innerHTML = null;
  for (var i = 0; i < activityList.length; i++) {
    var activityPos = i + 1;
    var activityHtml = null;
    var activityIcon = returnIconElementByChain(activityList[i]["id"])
    var ibcText = returnIbcIcon(activityList[i]["id"])

    if (isActivityDone(activitiesAlreadyDone, activityList[i])) {
      activityHtml = `
      <div class="m-4 card-body">
      <div class="accordion" id="myAccordion-${activityPos}">
          <div class="accordion-item">
              <h2 class="accordion-header" id="heading-${activityPos}">
                  <button type="button" class="accordion-button collapsed headerBtn" data-bs-toggle="collapse" data-bs-target="#collapse-${activityPos}">
                    <span class="nameSpan">${activityIcon}  <b>${activityList[i]["name"]}</b> </span> ${ibcText}
                    <span id="check-icon-${activityPos}" class="checkIconSpan"><i class="fas fa-check"></i></span>
                  </button>                                    
              </h2>
              <div id="collapse-${activityPos}" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                  <div class="card-body">
                    <span class="descriptionSpan">${activityList[i]["description"]}</span>
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
                    <span class="nameSpan">${activityIcon}  <b>${activityList[i]["name"]}</b> </span> ${ibcText}
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
                  <span class="descriptionSpan">${activityList[i]["description"]}</span>
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

