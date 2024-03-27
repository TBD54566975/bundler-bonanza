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
import { MemoryLevel } from "memory-level";
import checkDwn from "./util/dwn-test";

// singleton
let dwn: Dwn;

const initMemoryDwn = async () => {
  if (!dwn) {
    const messageStore = new MessageStoreLevel({
      createLevelDatabase: async (_, options?: any) => new MemoryLevel(options),
    });

    const dataStore = new DataStoreLevel({
      createLevelDatabase: async (_, options?) => new MemoryLevel(options),
    });

    const eventLog = new EventLogLevel({
      createLevelDatabase: async (_, options?) => new MemoryLevel(options),
      location: "EVENTLOG",
    });
    const didResolver = new UniversalResolver({ didResolvers: [DidKey] });
    dwn = await Dwn.create({ didResolver, messageStore, dataStore, eventLog })

    console.info("Memory-Level DWN initialized");

    const result = await checkDwn(dwn, TestDataGenerator, DataStream, Jws, RecordsWrite, RecordsRead, RecordsDelete);
    return result;
  }

  console.warn(
    "initDwn was called but the dwn was already initialized. This has been no-oped so it's harmless. But check your code and make sure you aren't running initialization twice."
  );
};

const getDwn = () => {
  return dwn;
};

export const DwnManager = {
  initMemoryDwn,
  getDwn,
};
