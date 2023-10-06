import { Web5 } from "@tbd54566975/web5";

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
    result.web5 = await Web5.connect({
      techPreview: {
        dwnEndpoints: ["http://localhost:3000"],
      },
    });
    did = result.web5.did;
  } catch (error) {
    console.log("Error:", error);
  }

  try {
    const { record: _record } = await result.web5.dwn.records.write({
      data: "Hello!",
    });
    result.record = _record;
  } catch (error) {
    console.log("Record Error:", error);
  }

  try {
    const { status } = await result.web5.dwn.records.read({
      recordId: record.id,
    });

    result.readStatus = status;
  } catch (error) {
    console.log("Read Record Error:", error);
  }

  try {
    const { status } = await result.web5.dwn.records.update({
      recordId: record.id,
      data: "Hello Update!",
    });

    result.updateStatus = status;
  } catch (error) {
    console.log("Update Record Error:", error);
  }

  try {
    const { status } = await result.web5.dwn.records.delete({
      recordId: record.id,
    });

    result.deleteStatus = status;
  } catch (error) {
    console.log("Delete Record Error:", error);
  }

  console.log(JSON.stringify(result, null, 2));

  return result;
};

checkWeb5();

// const { web5, did } = await Web5.connect({
//   techPreview: {
//     dwnEndpoints: ['http://localhost:3000']
//   }
// });

// const { record, status } = await web5.dwn.records.write({
//   data: 'Hello!'
// });

// console.log(JSON.stringify(status, null, 2));
// console.log(record);
