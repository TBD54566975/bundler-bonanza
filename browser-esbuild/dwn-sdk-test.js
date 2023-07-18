import { Dwn } from '@tbd54566975/dwn-sdk-js'
import { MessageStoreLevel, DataStoreLevel, EventLogLevel } from '@tbd54566975/dwn-sdk-js/stores';

const messageStore = new MessageStoreLevel()
const dataStore = new DataStoreLevel()
const eventLog = new EventLogLevel()

const dwn = await Dwn.create({ messageStore, dataStore, eventLog });

console.log(dwn)

await dwn.close()