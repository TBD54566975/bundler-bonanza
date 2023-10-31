import { Buffer } from 'buffer';
import './style.css';
import { Web5 } from '@web5/api';
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
} from '@tbd54566975/dwn-sdk-js';

import checkWeb5 from '../util/web5-test.js';
import checkDwn from '../util/dwn-test.js';

// import './dwn-sdk-test.js'

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
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
