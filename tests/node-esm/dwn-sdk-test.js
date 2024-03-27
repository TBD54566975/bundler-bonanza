import "../util/node-polyfill.js";

import { DidKey, UniversalResolver } from '@web5/dids';

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
} from "@tbd54566975/dwn-sdk-js";

import checkDwn from "../util/dwn-test.js";

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
  EventLogLevel
);
