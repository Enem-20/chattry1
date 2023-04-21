import WebSocket, {WebSocketServer} from "ws";
import {v4 as uuid} from "uuid";
import {Sequelize} from "sequelize";
import {DataBaseUtils} from "./DataBaseUtils.js";

import {fileURLToPath} from 'url';
import * as path from "path";

///////////////////////////////////////////////Rewrote to express///////////////////////////////////////////////////////
import express from 'express';

import commonjsVariables from 'commonjs-variables-for-esmodules';

const {
    __filename,
    __dirname
} = commonjsVariables(import.meta);

//const {Server} = ws;

const app = express();
const expressPort = 3000;

app.use(express.static(path.join(path.dirname(__dirname), 'client', 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(path.dirname(__dirname), 'build', 'client', 'index.html'));
});

app.listen(expressPort, () => console.log(`Listening on ${expressPort}`))
////////////////////////////////WebSocket transferring//////////////////////////////////////////////////////////////////
let wsPort = 443;
const wss = new WebSocketServer({port: wsPort});
const sequelize = DataBaseUtils.authentication();

let clients = {}

async function loadChats(id) {
    let DB = new DataBaseUtils();
    let Chats = await DB.findChatsByUserId(id);

    let LastMessages = await DB.findAllLastMessagesFromChatArray(Chats);
    return {ChatInfo: Chats, LastMessagesTxt: LastMessages};
}

function onConnect(wsClient) {
    console.log('Новый пользователь');
    const id = uuid();
    clients[id] = wsClient;

    wsClient.send('Привет');
    wsClient.on('message', function (message) {
        console.log("Клиент отправил сообщение: " + message)
    });
    wsClient.on('close', function () {
        console.log('Пользователь отключился')
    });
}

function onMessage(message) {
    const jsMessage = JSON.parse(message);

    switch (jsMessage["type"]) {
        case "authorization":
            const currentClientID = jsMessage["UserID"];
            clients[currentClientID].send(loadChats(currentClientID));
            break;
    }
}

wss.on("connection", onConnect);
wss.on("message", onMessage);