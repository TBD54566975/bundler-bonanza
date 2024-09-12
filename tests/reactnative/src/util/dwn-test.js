const checkResult = (result) => {
  console.info({ result });
  const errors = [];

  if (!result.dwn) {
    errors.push("DWN is not defined!");
  }

  if (!result.didKey) {
    errors.push("DID is not defined!");
  }

  if (!result.recordId) {
    errors.push("RecordId is not defined!");
  }

  if (result.writeStatus !== 202) {
    errors.push("Write status is not 202!");
  }

  if (!result.writtenDataAsExpected) {
    errors.push("Written data is not as expected!");
  }

  if (result.updateStatus !== 202) {
    errors.push("Update status is not 202!");
  }

  if (result.readUpdatedStatus !== 200) {
    errors.push("Read updated status is not 200!");
  }

  if (!result.updatedDataAsExpected) {
    errors.push("Updated data is not as expected!");
  }

  if (result.deleteStatus !== 202) {
    errors.push("Delete status is not 202!");
  }

  if (!result.readNotFoundForDeleted) {
    errors.push("Read not found for deleted is not true!");
  }

  if (!result.closedDwn) {
    errors.push("Failed to close DWN!");
  }

  if (errors.length > 0) {
    console.error({ errors });
    throw new Error(`One or more checks failed:\n${errors.join("\n")}`);
  } else {
    console.info("All Checks Passed! ✅");
  }
};

const checkDwn = async (
  dwn,
  TestDataGenerator,
  DataStream,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete
) => {
  const result = {
    dwn: null,
    didKey: null,
    recordId: null,
    writeStatus: null,
    writtenDataAsExpected: false,
    updateStatus: null,
    readUpdatedStatus: null,
    readUpdatedText: null,
    readUpdatedBytes: null,
    updatedDataAsExpected: false,
    deleteStatus: null,
    readNotFoundForDeleted: false,
    closedDwn: false,
  };

  if (!dwn) {
    // early abort because there's no DWN to test
    throw new Error("Unable to initialize DWN");
  }
  result.dwn = dwn;

  const didKey = await TestDataGenerator.generateDidKeyPersona();
  result.didKey = didKey;

  const signer = Jws.createSigner(didKey);

  const greetings = "Hello, World!";
  const {
    recordId,
    message,
    statusCode: writeStatus,
  } = await writeData(greetings, dwn, didKey, RecordsWrite, signer, DataStream);
  result.recordId = recordId;
  result.writeStatus = writeStatus;
  console.info({ writeData: { recordId, writeStatus } });

  try {
    const { data: writtenData } = await readData(
      recordId,
      dwn,
      didKey,
      RecordsRead
    );
    const writtenDataAsExpected = writtenData === greetings;
    console.info({ writtenDataAsExpected, writtenData });
    result.writtenDataAsExpected = writtenDataAsExpected;
  } catch (error) {
    console.error("readData Error:", error);
  }

  const updatedGreetings = "Hello, World! Updated!";
  try {
    const { statusCode: writeUpdateStatus } = await writeData(
      updatedGreetings,
      dwn,
      didKey,
      RecordsWrite,
      signer,
      DataStream,
      message
    );
    result.updateStatus = writeUpdateStatus;
    console.info({ writeUpdateStatus });
  } catch (error) {
    console.error("update writeData Error:", error);
  }

  try {
    const { data: updatedData, dataText: updatedText, dataBytes: updatedBytes, statusCode: readUpdatedStatus } = await readData(
      recordId,
      dwn,
      didKey,
      RecordsRead
    );
    const updatedDataAsExpected = updatedData === updatedGreetings;
    console.info({ updatedDataAsExpected, updatedData, updatedBytes, updatedText });
    result.readUpdatedStatus = readUpdatedStatus;
    result.updatedDataAsExpected = updatedDataAsExpected;
    result.readUpdatedBytes = updatedBytes;
    result.readUpdatedText = updatedText;
  } catch (error) {
    console.error("read updatedData Error:", error);
  }

  try {
    const { statusCode: deleteStatus } = await deleteData(
      recordId,
      dwn,
      didKey,
      RecordsDelete,
      signer
    );
    console.info({ deleteStatus });
    result.deleteStatus = deleteStatus;
  } catch (error) {
    console.error("deleteData Error:", error);
  }

  try {
    const { statusCode: readDeletedStatus } = await readData(
      recordId,
      dwn,
      didKey,
      RecordsRead
    );
    const readNotFoundForDeleted = readDeletedStatus === 404;
    console.info({ readNotFoundForDeleted, readDeletedStatus });
    result.readNotFoundForDeleted = readNotFoundForDeleted;
  } catch (error) {
    console.error("read deletedData Error:", error);
  }

  try {
    await dwn.close();
    result.closedDwn = true;
  } catch (error) {
    console.error("close DWN Error:", error);
  }

  checkResult(result);

  return result;
};

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

const readData = async (recordId, dwn, didKey, RecordsRead) => {
  const recordsRead = await RecordsRead.create({ filter: { recordId } });
  const readResult = await dwn.processMessage(didKey.did, recordsRead.message);

  const data =
    readResult.status.code === 200
      ? await streamToString(readResult.record.data)
      : null;
  
  const dataText = readResult.status.code === 200 ?
    await TextDecoder().decode(await readResult.record.data.bytes()) : null;

  const dataBytes = readResult.status.code === 200 ?
    await readResult.record.data.bytes() : null;

  return { data, dataText, dataBytes, statusCode: readResult.status.code };
};

const writeData = async (
  text,
  dwn,
  didKey,
  RecordsWrite,
  signer,
  DataStream,
  message
) => {
  // create some data
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const recordsWrite = message // existing message: this is a write update
    ? await RecordsWrite.createFrom({
        recordsWriteMessage: message,
        data: data,
        signer,
      })
    : // else, create a brand new record write message
      await RecordsWrite.create({
        data,
        dataFormat: "plain/text",
        published: true,
        schema: "yeeter/post",
        signer,
      });

  // get the DWN to process the RecordsWrite
  const dataStream = DataStream.fromBytes(data);
  const writeResult = await dwn.processMessage(
    didKey.did,
    recordsWrite.message,
    { dataStream }
  );

  if (writeResult.status.code !== 202) {
    throw new Error(
      `Invalid write result status code: ${writeResult.status.code}. Expected 202`
    );
  }

  return {
    recordId: recordsWrite.message.recordId,
    message: recordsWrite.message,
    statusCode: writeResult.status.code,
  };
};

const deleteData = async (recordId, dwn, didKey, RecordsDelete, signer) => {
  const recordsDelete = await RecordsDelete.create({
    recordId,
    signer,
  });
  const deleteResult = await dwn.processMessage(
    didKey.did,
    recordsDelete.message
  );

  if (deleteResult.status.code !== 202) {
    throw new Error(
      `Invalid delete result status code: ${deleteResult.status.code}. Expected 202`
    );
  }

  return { statusCode: deleteResult.status.code };
};

export default checkDwn;
