import WebSocket, { WebSocketServer } from "ws";
import {v4 as uuid} from "uuid";
import {Sequelize} from "sequelize";
import {DataBaseUtils} from "./DataBaseUtils.js";


///////////////////////////////////////////////Rewrite to express///////////////////////////////////////////////////////
import express from 'express';
import { fileURLToPath } from 'url';
import * as path from "path";

import commonjsVariables from 'commonjs-variables-for-esmodules';

const {
    __filename,
    __dirname
} = commonjsVariables(import.meta);

//const {Server} = ws;

const app = express();
const port = 3000;

const ChatsDB = new DataBaseUtils();

app.get(`/`, function(req, res){
    let pathtoHTML = path.join(__dirname,  'index.html');
    console.log(pathtoHTML);
    res.sendFile(pathtoHTML);
    //res.send("Hello world!");
});

app.get(`/chats`, async function(req, res){
    let myParam = req.url.split('UserID=')[1]
    let result = await ChatsDB.findChatsByUserId(Number(myParam));
    res.send(result);
});

app.listen(port, function(){
    console.log(`example app listening on port ${port}`);
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const wss = new WebSocketServer({port:3000});
// const sequelize = DataBaseUtils.authentication();
//
// function loadChats(id){
//     sequelize.sync().then(()=>{
//         let ClientsDB = new DataBaseUtils();
//
//         let user = ClientsDB.findUserById(1).then((result) => {
//             return result;
//         });
//         console.log(`Chats for user: ${id} was loaded`);
//     });
// }
//
// function onConnect(wsClient){
//     console.log('Новый пользователь');
//     const id = uuid();
//     loadChats(id);
//     wsClient.send('Привет');
//     wsClient.on('message', function(message){console.log("Клиент отправил сообщение: " + message)});
//     wsClient.on('close', function(){console.log('Пользователь отключился')});
//
// }
//
// wss.on("connection", onConnect);