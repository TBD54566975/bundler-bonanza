import "../util/node-polyfill.js";
import { Web5 } from "@web5/api";
import checkWeb5 from "../util/web5-test.js";

checkWeb5(Web5).then(() => process.exit());
