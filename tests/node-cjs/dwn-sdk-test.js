const {
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
} = require("@tbd54566975/dwn-sdk-js");
const {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
} = require("@tbd54566975/dwn-sdk-js/stores");
const checkDwn = require("../util/dwn-test");

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
