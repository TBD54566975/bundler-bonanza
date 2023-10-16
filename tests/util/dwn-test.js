require("./webcrypto-polyfill.js");

const checkDwn = async (
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel
) => {
  const messageStore = new MessageStoreLevel();
  const dataStore = new DataStoreLevel();
  const eventLog = new EventLogLevel();
  const dwn = await Dwn.create({ messageStore, dataStore, eventLog });

  // generate a did:key DID
  const didKey = await DidKeyResolver.generate();

  // create some data
  const encoder = new TextEncoder();
  const data = encoder.encode("Hello, World!");

  // create a RecordsWrite message
  const recordsWrite = await RecordsWrite.create({
    data,
    dataFormat: "application/json",
    published: true,
    schema: "yeeter/post",
    authorizationSignatureInput: Jws.createSignatureInput(didKey),
  });

  // get the DWN to process the RecordsWrite
  const dataStream = DataStream.fromBytes(data);
  const result = await dwn.processMessage(
    didKey.did,
    recordsWrite.message,
    dataStream
  );

  console.log(JSON.stringify(result, null, 2));

  if (result.status.code !== 202) {
    throw new Error(
      `Invalid result status code: ${result.status.code}. Expected 202`
    );
  }

  await dwn.close();

  console.log("All Checks Passed! ✅");
};

module.exports = checkDwn;
