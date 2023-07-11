import _ from 'lodash';
import { Dwn } from '@tbd54566975/dwn-sdk-js'

async function testDwn() {
  const dwn = await Dwn.create();
  console.log(dwn);
  await dwn.close();
}

async function component() {
  await testDwn()
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(await component());