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
    result.record.updateStatus = status;

    const readStatus = (await result.record.data.text()) === "Updated!";
    result.didUpdate = readStatus;
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

  console.log(result);

  return result;
};

export default checkWeb5;
