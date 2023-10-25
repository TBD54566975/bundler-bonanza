require("./webcrypto-polyfill.js");

function checkResult(result) {
  console.info({ result });
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
    throw new Error("One or more checks failed!");
  } else {
    console.info("All Checks Passed! ✅");
  }
}

const checkWeb5 = async (Web5) => {
  let result = {
    web5: null,
    did: null,
    record: null,
    readStatus: null,
    updateStatus: null,
    didUpdate: false,
    deleteStatus: null,
    didDelete: false,
  };

  try {
    const web5 = await Web5.connect({
      techPreview: {
        dwnEndpoints: ["http://localhost:3000"],
      },
    });

    result.web5 = web5.web5;
    result.did = result.web5.did;
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
    const { status } = await result.web5.dwn.records.read({
      message: { recordId: result.record._recordId },
    });

    result.readStatus = status;
  } catch (error) {
    console.error("Read Record Error:", error);
  }

  try {
    const { status } = await result.record.update({ data: "Updated!" });
    result.updateStatus = status;

    result.didUpdate = (await result.record.data.text()) === "Updated!";
  } catch (error) {
    console.error("Update Record Error:", error);
  }

  try {
    const { status } = await result.record.delete();
    result.deleteStatus = status.code;
    result.didDelete = result.record.isDeleted;
  } catch (error) {
    console.error("Delete Record Error:", error);
  }

  checkResult(result);

  return result;
};

module.exports = checkWeb5;
