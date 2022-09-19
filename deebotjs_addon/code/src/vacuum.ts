const ecovacsDeebot = require('ecovacs-deebot');
const EcoVacsAPI = ecovacsDeebot.EcoVacsAPI;
const nodeMachineId = require('node-machine-id');
console.log(process.env);

const countryCode = process.env.DEEBOT_COUNTRCODE!; // If it doesn't appear to work try "ww", their world-wide catchall.
const device_id = EcoVacsAPI.getDeviceId(nodeMachineId.machineIdSync(), 0);
const continent = ecovacsDeebot.countries[countryCode.toUpperCase()].continent.toLowerCase();
// Leave blank or use 'ecovacs.com' for Ecovacs login
// or use 'yeedi.com' for yeedi login (available since version 0.8.3-alpha.2)
const authDomain = '';

let api = new EcoVacsAPI(device_id, countryCode, continent, authDomain);

export { api };