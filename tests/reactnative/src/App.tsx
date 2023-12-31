import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DwnManager } from "./DwnManager";

import { Web5 } from "@web5/api";
import { getWeb5 } from "./Web5Manager";

export default function App() {
  const [dwnTestsResults, setDwnTestsResults] = useState("");
  const [web5TestResults, setWeb5TestsResults] = useState("");

  useEffect(() => {
    const loadWeb5AndTestsResults = async () => {
      try {
        const {
          web5: _web5,
          record,
          did,
          ...web5TestsResultRaw
        } = await getWeb5();
        const web5TestsResults = {
          ...web5TestsResultRaw,
          success: true,
          dataCid: record?.dataCid,
          did: did?.substr(0, 32) + "...",
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

    const loadDwnAndTestsResults = async () => {
      try {
        const {
          dwn: _dwn,
          didKey,
          ...testsResultsRaw
        } = await DwnManager.initMemoryDwn();
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

    loadDwnAndTestsResults();
    loadWeb5AndTestsResults();
  }, []);

  const onTestWeb5Press = async () => {
    try {
      // TODO: fix this with a custom rn agent
      const { web5, did } = await Web5.connect();
      console.info("connected", { web5, did });
      // await checkWeb5(Web5);
    } catch (error) {
      console.error(error);
    }
  };

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
