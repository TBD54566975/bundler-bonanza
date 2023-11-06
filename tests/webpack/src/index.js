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

import browserCheck from "../../util/browser-check";
const { checkWeb5, checkDwn } = browserCheck;

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

  const web5Results = await checkWeb5(Web5);
  web5ResultsElement.textContent = web5Results;

  const dwnResult = await checkDwn(
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
  dwnResultsElement.textContent = dwnResult;

  return element;
}

(async () => {
  document.body.appendChild(await displayResults());
})();
