import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { Web5 } from "@web5/api/browser";
import checkWeb5 from "../../../util/web5-test";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [web5, setWeb5] = React.useState(null);

  React.useEffect(() => {
    async function handleWeb5Connect() {
      const result = await checkWeb5(Web5);

      setWeb5(result.did.connectedDid);

      // try {
      //   const web5Instance = await Web5.connect();
      //   console.log("Web5 connected");
      //   setWeb5(web5Instance);
      // } catch (error) {
      //   console.error("Failed to connect to Web5:", error);
      // }
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
    </Layout>
  );
}
