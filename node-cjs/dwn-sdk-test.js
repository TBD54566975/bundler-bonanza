const { Dwn } = require('@tbd54566975/dwn-sdk-js');

(async () => {
  const dwn = await Dwn.create()
  await dwn.close()
})()