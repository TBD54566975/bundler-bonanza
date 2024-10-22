function checkResult(result) {
  // console.info({ result });
  const errors = [];

  if (!result.didUpdate) {
    errors.push("Record did not update!");
  }

  if (!result.didDelete) {
    errors.push("Record did not delete!");
  }

  if (result.readStatus.code !== 200) {
    errors.push("Read status code is not 200!");
  }

  if (!result.readText) {
    errors.push("Read text was not correct!");
  }

  if(!result.readBytes) {
    errors.push("Read bytes was not correct!");
  }

  if (!result.did) {
    errors.push("DID is not defined!");
  }

  if (!result.record) {
    errors.push("Record is not defined!");
  }

  if (!result.web5) {
    errors.push("Web5 is not defined!");
  }

  if (result.updateStatus.code !== 202) {
    errors.push("Update status is not defined!");
  }

  if (errors.length > 0) {
    console.error({ errors });
    throw new Error(`One or more checks failed:\n${errors.join(", ")}`);
  } else {
    console.info("All Web5 Checks Passed! ✅");
  }
}

const testWeb5 = async (web5) => {
  let result = {
    web5: null,
    did: null,
    record: null,
    readStatus: null,
    readText: null,
    readBytes: null,
    updateStatus: null,
    didUpdate: false,
    deleteStatus: null,
    didDelete: false,
  };

  try {
    result.web5 = web5;
    result.did = result.web5.did.agent.agentDid;
  } catch (error) {
    console.error("Web5.connect Error:", error);
  }

  try {
    const { record: _record } = await result.web5.dwn.records.write({
      data: "Hello!",
    });
    result.record = _record;
  } catch (error) {
    console.error("Create Record Error:", error);
  }

  try {
    const { status, record } = await result.web5.dwn.records.read({
      message: { filter: { recordId: result.record._recordId } },
    });

    const text = await record.data.text();
    result.readText = text === "Hello!";

    const bytes = await record.data.bytes();
    const dataText = new TextDecoder().decode(bytes);
    result.readBytes = dataText === "Hello!";

    // set status at the end, if the data throws status will not be set.
    result.readStatus = status;
  } catch (error) {
    console.error("Read Record Error:", error);
  }

  try {
    const { status } = await result.record.update({ data: "Updated!" });
    result.updateStatus = status;

    // TODO: we need to figure out why this doesn't work in RN
    // result.didUpdate = (await result.record.data.text()) === "Updated!";
    // Currently we are receiving the following error:
    // Update Record Error: [TypeError: dataBlob.text is not a function (it is undefined)]

    // Forcing a re-read since above doesn't work in RN:
    const { record } = await result.web5.dwn.records.read({
      message: { filter: { recordId: result.record._recordId } },
    });
    result.didUpdate = (await record.data.text()) === "Updated!";
  } catch (error) {
    console.error("Update Record Error:", error);
  }

  try {
    const { status } = await result.web5.dwn.records.delete({
      message: { recordId: result.record.id },
    });
    result.deleteStatus = status.code;
    const { record: shouldBeUndefined } = await result.web5.dwn.records.read({
      message: { filter: { recordId: result.record.id } },
    });
    result.didDelete = shouldBeUndefined === undefined;
  } catch (error) {
    console.error("Delete Record Error:", error);
  }

  checkResult(result);

  return result;
};

export default testWeb5;
