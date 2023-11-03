import { Buffer } from "buffer";

import {
  Dwn,
  EventLogLevel,
  MessageStoreLevel,
  DataStoreLevel,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStream,
  DidKeyResolver,
} from "@tbd54566975/dwn-sdk-js";
import { Web5 } from "@web5/api";

import checkDwn from "../../util/dwn-test";
import checkWeb5 from "../../util/web5-test";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

async function displayResults() {
  const element = document.createElement("div");
  element.innerHTML = "<h1>hello webpack!</h1>";

  const web5ResultsElement = document.createElement("pre");
  web5ResultsElement.id = "web5-results";
  element.appendChild(web5ResultsElement);

  const dwnResultsElement = document.createElement("pre");
  dwnResultsElement.id = "dwn-results";
  element.appendChild(dwnResultsElement);

  try {
    const web5Results = await checkWeb5(Web5);
    const did = web5Results.web5.did.connectedDid;
    web5ResultsElement.textContent = JSON.stringify(
      {
        success: true,
        web5Results: did,
      },
      null,
      2
    );
  } catch (error) {
    web5ResultsElement.textContent = JSON.stringify(
      {
        success: false,
        error: error.message,
      },
      null,
      2
    );
  }

  try {
    const dwnResults = await checkDwn(
      Dwn,
      DataStream,
      DidKeyResolver,
      Jws,
      RecordsWrite,
      RecordsRead,
      RecordsDelete,
      MessageStoreLevel,
      DataStoreLevel,
      EventLogLevel
    );
    dwnResultsElement.textContent = JSON.stringify(
      {
        success: true,
        dwnResults,
      },
      null,
      2
    );
  } catch (error) {
    dwnResultsElement.textContent = JSON.stringify(
      {
        success: false,
        error: error.message,
      },
      null,
      2
    );
  }

  return element;
}

(async () => {
  document.body.appendChild(await displayResults());
})();
