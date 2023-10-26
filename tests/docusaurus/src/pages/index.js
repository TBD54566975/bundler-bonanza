import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Web5 } from "@web5/api/browser";
import checkWeb5 from "../../../util/web5-test";
import checkDwn from "../../../util/dwn-test";
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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [web5, setWeb5] = React.useState(null);
  const [dwn, setDwn] = React.useState(null);

  React.useEffect(() => {
    async function handleWeb5Connect() {
      const result = await checkWeb5(Web5);
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

      setWeb5(result.did.connectedDid);
      setDwn(dwnResult);

      console.log(dwnResult);
    }
    handleWeb5Connect();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>Web5 stuff right here</main>
      {web5 && <div>{web5}</div>}

      <div>Dwn stuff right here</div>
      {dwn && <div>{JSON.stringify(dwn)}</div>}
    </Layout>
  );
}
