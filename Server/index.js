import WebSocket, {WebSocketServer} from "ws";
import {v4 as uuid} from "uuid";
import {Sequelize} from "sequelize";
import {DataBaseUtils} from "./DataBaseUtils.js";
import HttpServer from 'http';
import bodyParser from 'body-parser';

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
let httpServer = HttpServer.createServer()
const app = express();
const expressPort = 3000;

app.use(express.static(path.join(path.dirname(__dirname), 'client', 'dist')));

app.use(express.json());
app.use(express.urlencoded());
app.post('/', function (req, res) {
    console.log(`request body value: ${req.body.ID}`);
    loadChats(Number(req.body.ID)).then(function(result){
        console.log(result.LastMessagesTxt[0].MessageTxt);
        res.json(result);
    });
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(path.dirname(__dirname), 'client', 'public', 'bundle.js'));
// });

// app.get('/', function (req, res) {
//     res.sendFile(path.join(path.dirname(__dirname), 'client', 'dist', 'index.html'));
// });

//app.listen(expressPort, () => console.log(`Listening on ${expressPort}`))
////////////////////////////////WebSocket transferring//////////////////////////////////////////////////////////////////
let wsPort = 3000;
const wss = new WebSocketServer({server: httpServer});
httpServer.on('request', app);
//const sequelize = DataBaseUtils.authentication();

let clients = {}

async function loadChats(id) {
    let DB = new DataBaseUtils();
    let Chats = await DB.findChatsByUserId(id);
    let ChatsIds = [];
    for(let i = 0; i < Chats.length; ++i){
        ChatsIds.push(Chats[i].id);
    }

    let LastMessages = await DB.findAllLastMessagesFromChatArray(ChatsIds);
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
    console.log(`received message: ${message}`);
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

httpServer.listen(3000, function() {

    console.log(`http/ws server listening on 3000`);
});