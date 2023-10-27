import { Web5 } from "@web5/api";
import checkDwn from "../util/dwn-test.js";
import checkWeb5 from "../util/web5-test.js";
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

const handleCheckWeb5 = async () => {
  const web5TestOutput = document.getElementById("web5-test-output");

  try {
    const web5Result = await checkWeb5(Web5);
    console.log("web5 connected", web5Result);
    web5TestOutput.innerHTML = web5Result.did.connectedDid;
  } catch (error) {
    console.error("Error connecting to web5:", error);
    web5TestOutput.innerHTML = "Error connecting to web5.";
  }
};

const handleCheckDwn = async () => {
  const dwnTestOutput = document.getElementById("dwn-test-output");

  try {
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
    console.log("dwn connected", dwnResult);
    dwnTestOutput.innerHTML = JSON.stringify(dwnResult);
  } catch (error) {
    console.error("Error connecting to dwn:", error);
    dwnTestOutput.innerHTML = "Error connecting to dwn.";
  }
};

handleCheckWeb5();

handleCheckDwn();
