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

async function component() {
  const element = document.createElement("div");
  element.innerHTML = "hello webpack!";
  return element;
}

checkWeb5(Web5);
checkDwn(
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

document.body.appendChild(await component());
