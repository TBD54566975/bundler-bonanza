const { Web5 } = require('@web5/api');
const checkWeb5 = require('../util/web5-test.js');

checkWeb5(Web5).then(() => process.exit());
