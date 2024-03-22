import { Web5 } from "@web5/api";
import { DidKey, UniversalResolver } from "@web5/dids";
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
  TestDataGenerator,
} from "@tbd54566975/dwn-sdk-js";

import { checkWeb5, checkDwn } from "../util/browser-check.js";

const handleCheckWeb5 = async () => {
  const web5TestOutput = document.getElementById("web5-results");
  const result = await checkWeb5(Web5);
  web5TestOutput.innerHTML = result;
};

const handleCheckDwn = async () => {
  const dwnTestOutput = document.getElementById("dwn-results");
  const dwnResult = await checkDwn(
    Dwn,
    DataStream,
    UniversalResolver,
    DidKey,
    TestDataGenerator,
    Jws,
    RecordsWrite,
    RecordsRead,
    RecordsDelete,
    MessageStoreLevel,
    DataStoreLevel,
    EventLogLevel
  );
  dwnTestOutput.innerHTML = dwnResult;
};

handleCheckWeb5();

handleCheckDwn();
