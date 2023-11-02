import { Buffer } from "buffer";
import { Web5 } from "@web5/api";


import {
  Dwn,
  DataStream,
  DidKeyResolver,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStoreLevel,
  EventLogLevel,
  MessageStoreLevel,
} from "@tbd54566975/dwn-sdk-js";

import checkWeb5 from "../../../../util/web5-test.js";
import checkDwn from "../../../../util/dwn-test.js";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

export function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
    initWeb5()
    initDwn()
  })
}

async function initWeb5() {
  await checkWeb5(Web5)
  replaceText('#web5-results', 'Web5 renderer is ready!')
}

async function initDwn() {
  await checkDwn(
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
  replaceText('#dwn-results', 'Dwn renderer is ready!')
}

function doAThing(): void {
  const versions = window.electron.process.versions
  replaceText('.electron-version', `Electron v${versions.electron}`)
  replaceText('.chrome-version', `Chromium v${versions.chrome}`)
  replaceText('.node-version', `Node v${versions.node}`)
  replaceText('.v8-version', `V8 v${versions.v8}`)
}

function replaceText(selector: string, text: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.innerText = text
  }
}

init()
