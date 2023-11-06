import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Web5 } from "@web5/api";
import {
  Dwn,
  EventLogLevel,
  MessageStoreLevel,
  DataStoreLevel,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStream,
  DidKeyResolver,
} from "@tbd54566975/dwn-sdk-js";

import browserCheck from "../../../util/browser-check";
const { checkWeb5, checkDwn } = browserCheck;

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [web5, setWeb5] = React.useState(null);
  const [dwn, setDwn] = React.useState(null);

  React.useEffect(() => {
    async function handleWeb5Connect() {
      const result = await checkWeb5(Web5);
      setWeb5(result);
    }

    async function handleDwnConnect() {
      const dwnResult = await checkDwn(
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
      setDwn(dwnResult);
    }

    handleWeb5Connect();
    handleDwnConnect();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <h1>Web5 tests results</h1>
      {web5 && <pre id="web5-results">{web5}</pre>}

      <h1>Dwn tests results</h1>
      {dwn && <pre id="dwn-results">{dwn}</pre>}
    </Layout>
  );
}
