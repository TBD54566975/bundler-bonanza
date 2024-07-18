import { MemoryLevel } from "memory-level";
import { MemoryLevelStore } from "./util/MemoryStore";
import testWeb5 from "./util/web5-test";

// diff
import { Web5IdentityAgent } from "@web5/identity-agent";
import {
  AgentDidApi,
  AgentSyncApi,
  HdIdentityVault,
  SyncEngineLevel,
  AgentDwnApi,
  DwnDidStore,
  InMemoryIdentityStore,
  InMemoryDidStore,
} from "@web5/agent";
import {
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel,
  ResumableTaskStoreLevel,
} from "@tbd54566975/dwn-sdk-js";
import { Web5 } from "@web5/api";
import { type Level } from "level";
import ms from "ms";
import { DidDht, DidJwk, DidResolverCacheLevel } from "@web5/dids";
import { CreateLevelDatabaseOptions } from "@tbd54566975/dwn-sdk-js/dist/types/src/store/level-wrapper";
import { DidResolverCacheMemory } from "./util/did-resolver-cache-memory";
import { MemoryStore } from "@web5/common";

let agent: Web5IdentityAgent;

export const getWeb5 = async () => {
  console.info("initializing agent...");
  await initAgent();
  console.info("agent initialized!");

  //TODO: This needs to be updated!!
  const serviceEndpointNodes = [ 'https://dwn.tbddev.org/beta' ];

  console.info("creating identity...!!!");
  // Generate a new Identity for the end-user.
  const identity = await agent.identity.create({
    didMethod: "dht",
    metadata: { name: "Social" },
    didOptions: {
      services: [
        {
          id: "dwn",
          type: "DecentralizedWebNode",
          serviceEndpoint: serviceEndpointNodes,
          enc: "#enc",
          sig: "#sig",
        },
      ],
      verificationMethods: [
        {
          algorithm: "Ed25519",
          id: "sig",
          purposes: ["assertionMethod", "authentication"],
        },
        {
          algorithm: "secp256k1",
          id: "enc",
          purposes: ["keyAgreement"],
        },
      ],
    },
  });

  await agent.identity.manage({ portableIdentity: await identity.export() });

  console.info("identity created!");

  const web5 = new Web5({ agent, connectedDid: identity.did.uri });

  console.info(`web5 initialized for ${identity.did.uri} `);

  return web5;
};

const initAgent = async () => {
  // agentVault
  const agentVault = new HdIdentityVault({
    keyDerivationWorkFactor: 210_000,
    store: new MemoryStore<string, string>(),
  });

  // didApi
  const didApi = new AgentDidApi({
    didMethods: [DidDht, DidJwk],
    resolverCache: new DidResolverCacheMemory(),
  });

  // syncApi
  const syncEngine = new SyncEngineLevel({
    db: new MemoryLevel() as Level,
  });

  const syncApi = new AgentSyncApi({ syncEngine });

  const dwnApi = new AgentDwnApi({
    dwn: await AgentDwnApi.createDwn({
      dataPath: "AGENT",
      didResolver: didApi,
      dataStore: new DataStoreLevel({
        blockstoreLocation: "DWN_DATASTORE",
        createLevelDatabase,
      }),
      messageStore: new MessageStoreLevel({
        blockstoreLocation: "DWN_MESSAGESTORE",
        indexLocation: "DWN_MESSAGEINDEX",
        createLevelDatabase,
      }),
      eventLog: new EventLogLevel({
        location: "DWN_EVENTLOG",
        createLevelDatabase,
      }),
      resumableTaskStore: new ResumableTaskStoreLevel({
        location: "DWN_RESUMABLETASKSTORE",
        createLevelDatabase,
      })
    }),
  });

  agent = await Web5IdentityAgent.create({
    dwnApi,
    didApi,
    agentVault,
    syncApi,
  });

  const password = "unprotectedpass";
  let recoveryPhrase: string|undefined;

  if (await agent.firstLaunch()) {
    recoveryPhrase = await agent.initialize({ password, recoveryPhrase });
  }

  await agent.start({ password });
  await startSync();
};

const startSync = async () => {
  // Register all DIDs under management, as well as the agent's master DID
  const managedIdentities = await agent.identity.list();
  const didsToRegister = [
    agent.agentDid,
    ...managedIdentities.map((i) => i.did),
  ];
  console.info("registering DIDs for sync", { didsToRegister });

  await Promise.all(
    didsToRegister.map((did) => agent.sync.registerIdentity({ did: did.uri }))
  );

  // TODO: Once selective sync is enabled, only sync for records that the mobile identity agent
  // cares about. We DO NOT want to sync every record the user has in their DWN to their mobile device.
  agent.sync.startSync({ interval: String(ms("2m")) }).catch((error: any) => {
    console.error(`Sync failed: ${error}`);
  });
};

const createLevelDatabase = <K, V>(
  location: string,
  options?: CreateLevelDatabaseOptions<V>
) => {
  const db = new MemoryLevel<K, V>();
  return Promise.resolve(db);
};
