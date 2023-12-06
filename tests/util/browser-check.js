const web5Test = require("./web5-test.js");
const dwnTest = require("./dwn-test.js");

/**
 * Helper functions to check web5 and dwn, and stringify them for browser output.
 */

const checkWeb5 = async (Web5) => {
  try {
    const {
      web5: _web5,
      record,
      did,
      ...web5TestsResultRaw
    } = await web5Test(Web5);
    const web5TestsResults = {
      ...web5TestsResultRaw,
      success: true,
      dataCid: record?.dataCid,
      did: did?.substr(0, 32) + "...",
    };
    return JSON.stringify(web5TestsResults, undefined, 2);
  } catch (error) {
    console.error(error);
    const errorResults = {
      success: false,
      error: true,
      message: error.message,
    };
    return JSON.stringify(errorResults, undefined, 2);
  }
};

const checkDwn = async (
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  MessageStoreLevel,
  DataStoreLevel,
  EventLogLevel
) => {
  try {
    const {
      dwn: _dwn,
      didKey,
      ...testsResultsRaw
    } = await dwnTest(
      Dwn,
      DataStream,
      DidKeyResolver,
      Jws,
      RecordsWrite,
      RecordsRead,
      RecordsDelete,
      MessageStoreLevel,
      DataStoreLevel,
      EventLogLevel
    );
    const testsResults = {
      ...testsResultsRaw,
      success: true,
      did: didKey?.did,
    };
    return JSON.stringify(testsResults, undefined, 2);
  } catch (error) {
    console.error(error);
    const errorResults = {
      success: false,
      error: true,
      message: error.message,
    };
    return JSON.stringify(errorResults, undefined, 2);
  }
};

const browserCheck = {
  checkWeb5,
  checkDwn,
};

module.exports = browserCheck;
