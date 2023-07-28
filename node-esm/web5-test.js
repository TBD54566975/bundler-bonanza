import { Web5 } from '@tbd54566975/web5';

const { web5, did } = await Web5.connect({
  techPreview: {
    dwnEndpoints: ['http://localhost:3000']
  }
});

const { record, status } = await web5.dwn.records.write({
  data: 'Hello!'
});

console.log(JSON.stringify(status, null, 2));
console.log(record);