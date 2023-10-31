import { type Level } from "level";
import { MemoryLevel } from "memory-level";
import { IdentityAgent } from "@web5/identity-agent";

import {
  Dwn,
  EventLogLevel,
  MessageStoreLevel,
  DataStoreLevel,
} from "@tbd54566975/dwn-sdk-js";

import { AppDataVault, DwnManager, SyncManagerLevel } from "@web5/agent";
import { DidIonMethod, type DidIonCreateOptions } from "@web5/dids";
import { getTechPreviewDwnEndpoints, Web5 } from "@web5/api";

import { MemoryLevelStore } from "./util/MemoryStore";

let agent: IdentityAgent;
let dwn: Dwn;

const initWeb5LocalDwn = async () => {
  if (dwn) {
    return dwn;
  }

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

  dwn = await Dwn.create({ messageStore, dataStore, eventLog });
};

const initAgent = async () => {
  if (agent) {
    console.warn(
      "initAgent was called, but the agent is already initialized. This has been no-oped."
    );
    return;
  }

  console.info("initializing DWN...");
  await initWeb5LocalDwn();
  console.info("DWN initialized!");

  const dwnManager = new DwnManager({ dwn });
  const appData = new AppDataVault({
    keyDerivationWorkFactor: 1,
    store: new MemoryLevelStore(),
  });

  const syncManager = new SyncManagerLevel({
    db: new MemoryLevel() as Level,
  });

  agent = await IdentityAgent.create({ dwnManager, appData, syncManager });

  await agent.start({ passphrase: "unprotected-passphrase" });
  await startSync();
};

const startSync = async () => {
    // Register all DIDs under management, as well as the agent's master DID
    const managedIdentities = await agent.identityManager.list();
    const didsToRegister = [
      agent.agentDid,
      ...managedIdentities.map((i) => i.did),
    ];
    console.info("registering DIDs for sync", { didsToRegister })
  
    await Promise.all(
      didsToRegister.map((did) => agent.syncManager.registerIdentity({ did }))
    );
  
    const twoMinutesMs = 2 * 60 * 1000
    agent.syncManager.startSync({ interval: twoMinutesMs }).catch((error: any) => {
      console.error(`Sync failed: ${error}`);
    });
  };

export const getWeb5 = async () => {
  const kms = "local";
  const didMethod = "ion";
  let didOptions: DidIonCreateOptions | undefined;

  const serviceEndpointNodes = await getTechPreviewDwnEndpoints();
  console.info({serviceEndpointNodes})
  didOptions = await DidIonMethod.generateDwnOptions({
    serviceEndpointNodes,
  });

  console.info("initializing agent...");
  await initAgent();
  console.info("agent initialized!");
  console.info({agent, agentDid: agent.agentDid});

  console.info("creating identity...");
  const identity = await agent.identityManager.create({
    name: "default",
    didMethod,
    didOptions,
    kms,
  });
  console.info("identity created!");

  // Import the identity that was just created, using the agent's DID as the context,
  // so that the agent can access that identity.
  await agent.identityManager.import({
    identity,
    context: agent.agentDid,
  });

  const web5 = new Web5({ agent, connectedDid: identity.did });
  return { web5, did: identity.did };
};
