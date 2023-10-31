import { Buffer } from 'buffer';

import _ from 'lodash';
// import { testDwn } from './dwn-sdk-test.js'\\
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
} from '@tbd54566975/dwn-sdk-js';
import { Web5 } from '@web5/api/browser';

import checkDwn from '../../util/dwn-test';
import checkWeb5 from '../../util/web5-test';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

async function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
checkWeb5(Web5);
checkDwn(
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

document.body.appendChild(await component());
