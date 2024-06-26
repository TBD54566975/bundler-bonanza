import { Dwn, DataStream, Jws, RecordsWrite, TestDataGenerator } from '@tbd54566975/dwn-sdk-js';
import { DataStoreLevel, EventLogLevel, MessageStoreLevel } from '@tbd54566975/dwn-sdk-js/stores';

const messageStore = new MessageStoreLevel();
const dataStore = new DataStoreLevel();
const eventLog = new EventLogLevel();
const dwn = await Dwn.create({ messageStore, dataStore, eventLog });

// generate a did:key DID
const didKey = await TestDataGenerator.generateDidKeyPersona();

// create some data
const encoder = new TextEncoder();
const data = encoder.encode('Hello, World!');

// create a RecordsWrite message
const recordsWrite = await RecordsWrite.create({
  data,
  dataFormat: 'application/json',
  published: true,
  schema: 'yeeter/post',
  signer: Jws.createSigner(didKey)
});

// get the DWN to process the RecordsWrite
const dataStream = DataStream.fromBytes(data);
const result = await dwn.processMessage(didKey.did, recordsWrite.message, dataStream);

console.log(result)
console.assert(result.status.code === 202)

await dwn.close()
