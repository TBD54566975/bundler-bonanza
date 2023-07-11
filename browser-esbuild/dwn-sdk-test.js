import { Dwn } from '@tbd54566975/dwn-sdk-js'

const dwn = await Dwn.create()
console.log(dwn);
await dwn.close()