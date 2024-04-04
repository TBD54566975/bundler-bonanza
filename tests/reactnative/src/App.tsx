import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DwnNoWeb5 } from "./DwnNoWeb5";
import { getWeb5 } from "./Web5";
import testWeb5 from "./util/web5-test";

export default function App() {
  const [dwnTestsResults, setDwnTestsResults] = useState("");
  const [web5TestResults, setWeb5TestsResults] = useState("");

  useEffect(() => {
    const runWeb5Tests = async () => {
      const web5 = await getWeb5();

      try {
        const {
          web5: _web5,
          record,
          did,
          ...web5TestsResultRaw
        } = await testWeb5(web5);
        const web5TestsResults = {
          ...web5TestsResultRaw,
          success: true,
          dataCid: record?.dataCid,
          did: did?.uri.substr(0, 32) + "...",
        };
        const web5TestsResultsStr = JSON.stringify(
          web5TestsResults,
          undefined,
          2
        );
        setWeb5TestsResults(web5TestsResultsStr);
      } catch (error) {
        console.error(error);
        const errorResults = {
          success: false,
          error: true,
          message: error.message,
        };
        const errorResultsStr = JSON.stringify(errorResults, undefined, 2);
        setWeb5TestsResults(errorResultsStr);
      }
    };

    const runDwnNoWeb5Tests = async () => {
      try {
        const {
          dwn: _dwn,
          didKey,
          ...testsResultsRaw
        } = await DwnNoWeb5.initMemoryDwn();
        const testsResults = {
          ...testsResultsRaw,
          success: true,
          did: didKey?.did,
        };
        const testsResultsStr = JSON.stringify(testsResults, undefined, 2);
        setDwnTestsResults(testsResultsStr);
      } catch (error) {
        console.error(error);
        const errorResults = {
          success: false,
          error: true,
          message: error.message,
        };
        const errorResultsStr = JSON.stringify(errorResults, undefined, 2);
        setDwnTestsResults(errorResultsStr);
      }
    };

    runDwnNoWeb5Tests();
    runWeb5Tests();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bundling testapp for web5</Text>
      {web5TestResults && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Web5 Tests Result
          </Text>
          <Text testID="web5-tests-result">{web5TestResults}</Text>
        </>
      )}
      {dwnTestsResults && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            DWN Tests Result
          </Text>
          <Text testID="dwn-tests-result">{dwnTestsResults}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
