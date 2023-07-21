const { Dwn, DataStream, DidKeyResolver, Jws, RecordsWrite } = require('@tbd54566975/dwn-sdk-js');
const { MessageStoreLevel, DataStoreLevel, EventLogLevel } = require('@tbd54566975/dwn-sdk-js/stores');

(async () => {
  const messageStore = new MessageStoreLevel();
  const dataStore = new DataStoreLevel();
  const eventLog = new EventLogLevel();
  const dwn = await Dwn.create({ messageStore, dataStore, eventLog });
  
  // generate a did:key DID
  const didKey = await DidKeyResolver.generate();
  
  // create some data
  const encoder = new TextEncoder();
  const data = encoder.encode('Hello, World!');
  
  // create a RecordsWrite message
  const recordsWrite = await RecordsWrite.create({
    data,
    dataFormat: 'application/json',
    published: true,
    schema: 'yeeter/post',
    authorizationSignatureInput: Jws.createSignatureInput(didKey)
  });
  
  // get the DWN to process the RecordsWrite
  const dataStream = DataStream.fromBytes(data);
  const result = await dwn.processMessage(didKey.did, recordsWrite.message, dataStream);
  
  console.log(JSON.stringify(result, null, 2))
  console.assert(result.status.code === 202)
  
  await dwn.close()
  
})()