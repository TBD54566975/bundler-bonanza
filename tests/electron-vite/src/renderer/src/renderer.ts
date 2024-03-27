import { Buffer } from 'buffer'
import { Web5 } from '@web5/api'

import { DidKey, UniversalResolver } from '@web5/dids';
import {
  Dwn,
  DataStream,
  Jws,
  RecordsWrite,
  RecordsRead,
  RecordsDelete,
  DataStoreLevel,
  EventLogLevel,
  MessageStoreLevel,
  TestDataGenerator
} from '@tbd54566975/dwn-sdk-js'

// import '../../util/webcrypto-polyfill.js'
import checkWeb5 from '../../util/web5-test.js'
import checkDwn from '../../util/dwn-test.js'

if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

export function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    loadVersionsInfo()
    initWeb5()
    initDwn()
  })
}

async function initWeb5(): Promise<void> {
  const result = await checkWeb5(Web5)
  replaceText('#web5-results', result)
}

async function initDwn(): Promise<void> {
  const result = await checkDwn(
    Dwn,
    UniversalResolver,
    DidKey,
    TestDataGenerator,
    DataStream,
    Jws,
    RecordsWrite,
    RecordsRead,
    RecordsDelete,
    MessageStoreLevel,
    DataStoreLevel,
    EventLogLevel
  )
  replaceText('#dwn-results', result)
}

function loadVersionsInfo(): void {
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
