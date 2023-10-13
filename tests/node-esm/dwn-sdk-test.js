import {
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
} from "@tbd54566975/dwn-sdk-js";
import {
  DataStoreLevel,
  EventLogLevel,
  MessageStoreLevel,
} from "@tbd54566975/dwn-sdk-js/stores";

import checkDwn from "../util/dwn-test.js";

checkDwn(
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel
).then(() => process.exit());
