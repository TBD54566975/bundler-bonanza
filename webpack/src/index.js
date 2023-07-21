import _ from 'lodash';
import { testDwn } from './dwn-sdk-test.js'

async function component() {
  await testDwn()
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(await component());