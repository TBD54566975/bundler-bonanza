import { Buffer } from "buffer";
import "./style.css";
import { Web5 } from "@web5/api";
import { DidKey, UniversalResolver } from "@web5/dids";
import {
  Dwn,
  DataStream,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStoreLevel,
  EventLogLevel,
  MessageStoreLevel,
  TestDataGenerator,
  ResumableTaskStoreLevel
} from "@tbd54566975/dwn-sdk-js";

import browserCheck from "../util/browser-check.js";
const { checkWeb5, checkDwn } = browserCheck;

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

async function displayResults() {
  const appEl = document.querySelector("#app");
  if (!appEl) {
    console.error("Couldn't find #app element");
    return;
  }

  const web5TestOutput = document.getElementById("web5-results");
  const web5Results = await checkWeb5(Web5);
  web5TestOutput.innerHTML = web5Results;

  const dwnTestOutput = document.getElementById("dwn-results");
  const dwnResult = await checkDwn(
    Dwn,
    UniversalResolver,
    DidKey,
    TestDataGenerator,
    DataStream,
    Jws,
    RecordsWrite,
    RecordsRead,
    RecordsDelete,
    MessageStoreLevel,
    DataStoreLevel,
    EventLogLevel,
    ResumableTaskStoreLevel
  );
  dwnTestOutput.innerHTML = dwnResult;
}

displayResults();
