import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DwnManager } from "./DwnManager";

import { Web5 } from "@web5/api";

export default function App() {
  const [dwnTestsResults, setDwnTestsResults] = useState("");

  useEffect(() => {
    // TODO: add proper web5 tests
    // DidManager.createDids();

    const loadDwnAndTestsResults = async () => {
      try {
        const { dwn: _dwn, ...testsResultsRaw } =
          await DwnManager.initMemoryDwn();
        const testsResults = { success: true, ...testsResultsRaw };
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
  }, []);

  const onTestWeb5Press = async () => {
    try {
      // await checkWeb5(Web5);
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
      <Button onPress={onTestWeb5Press} title="Test Web5" />
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
