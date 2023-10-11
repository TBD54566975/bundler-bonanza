import { Web5 } from "@web5/api";

const checkWeb5 = async () => {
  let result = {
    web5: null,
    did: null,
    record: null,
    readStatus: null,
    updateStatus: null,
    deleteStatus: null,
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

  console.log("????", result.record._recordId);

  try {
    const { status } = await result.web5.dwn.records.read({
      recordId: result.record._recordId,
    });

    result.readStatus = status;
  } catch (error) {
    console.error("Read Record Error:", error);
  }

  // try {
  //   const { status } = await result.web5.dwn.records.update({
  //     recordId: result.record._recordId,
  //     data: "Hello Update!",
  //   });

  //   result.updateStatus = status;
  // } catch (error) {
  //   console.error("Update Record Error:", error);
  // }

  // try {
  //   const { status } = await result.web5.dwn.records.delete({
  //     recordId: result.record._recordId,
  //   });

  //   result.deleteStatus = status;
  // } catch (error) {
  //   console.error("Delete Record Error:", error);
  // }

  // console.log(JSON.stringify(result, null, 2));

  return result;
};

checkWeb5();
