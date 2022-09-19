const {EcoVacsAPI} = require('ecovacs-deebot');
const mqtt = require('mqtt');
const { api } = require('./vacuum');
const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`, {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD
});

client.on('connect', () => {
    console.log('connected');
});

client.subscribe('vacuum_cmd/clean', (a) => {
    console.log('sub', a);
});
client.subscribe('vacuum_cmd/stop_cleaning', (a) => {
    console.log('sub', a);
});
const account_id = process.env.DEEBOT_USER;
const password = process.env.DEEBOT_PASSWORD;
const password_hash = EcoVacsAPI.md5(password);

async function connect() {

    await api.connect(account_id, password_hash);
    const [device] = await api.devices();
    console.log(device);
    const vacbot = api.getVacBotObj(device);

    await new Promise((r) => {
        vacbot.on('ready', r);
        vacbot.connect();
    });
    console.log('ready');
    return vacbot;
}
client.on('message', async (topic, message) => {
    console.log(topic, message.toString('utf8'));
    const vacbot = await connect()
    if (topic.endsWith('stop_cleaning')) {
        vacbot.charge();
    } else {
        vacbot.spotArea(message.toString('utf8').split(',')); // version >= 0.6.2
    }
    vacbot.disconnect();
});