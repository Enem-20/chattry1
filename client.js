//import WebSocket from 'ws';

/*const ws = new WebSocket('ws://localhost:3000');


ws.onconnect = function (){
    console.log("Соединение установлено.");
};

ws.onmessage = function (event){
    console.log("Получены данные " + event.data);
    ws.send("Я на сервере!");
};

/!*ws.onmessage = function (event){
    console.log(event.data);
};*!/

ws.onerror = function (event){
    console.log(event.message);
};

ws.onclose = function (event){
    console.log("Сервер разорвал соединение");
}*/

let response = await fetch("localhost:3000" + "/chats", {method:"get"});

console.log(response.text());
