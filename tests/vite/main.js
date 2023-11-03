import { Buffer } from "buffer";
import "./style.css";
import { Web5 } from "@web5/api";
import {
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStoreLevel,
  EventLogLevel,
  MessageStoreLevel,
} from "@tbd54566975/dwn-sdk-js";

import checkWeb5 from "../util/web5-test.js";
import checkDwn from "../util/dwn-test.js";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

async function displayResults() {
  const appEl = document.querySelector("#app");
  if (!appEl) {
    console.error("Couldn't find #app element");
    return;
  }

  try {
    const web5Results = await checkWeb5(Web5);
    const did = web5Results.web5.did.connectedDid;
    document.querySelector("#web5-results").innerText = JSON.stringify(
      {
        success: true,
        web5Results: did,
      },
      null,
      2
    );
  } catch (error) {
    document.querySelector("#web5-results").innerText = JSON.stringify(
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
    document.querySelector("#dwn-results").innerText = JSON.stringify(
      {
        success: true,
        dwnResults,
      },
      null,
      2
    );
  } catch (error) {
    document.querySelector("#dwn-results").innerText = JSON.stringify(
      {
        success: false,
        error: error.message,
      },
      null,
      2
    );
  }
}

displayResults();
