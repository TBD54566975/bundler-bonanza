import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DidManager } from "./DidManager";
import { DwnManager } from "./DwnManager";

export default function App() {
  useEffect(() => {
    DidManager.createDids();
    DwnManager.initMemoryDwn();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bundling testapp for web5</Text>
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
