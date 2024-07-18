require("../util/node-polyfill");

const { DidKey, UniversalResolver } = require('@web5/dids');

const {
  Dwn,
  DataStream,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
  TestDataGenerator,
  ResumableTaskStoreLevel
} = require("@tbd54566975/dwn-sdk-js");

const checkDwn = require("../util/dwn-test");

checkDwn(
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
