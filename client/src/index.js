import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import WebSocket from 'ws';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

const wsPort = 3000;
const ws = new WebSocket(`ws://localhost:${wsPort}/`);

export function submitAction() {
    ws.send(`{"UserID":${document.getElementById("formInput").textContent}}, "type":"authorization"`);
}

ws.onopen = function (event) {
    console.log("Соединение установлено.");
}

ws.onmessage = function (event) {
    console.log("Получены данные " + event.data);
    ws.send("Я на сервере!");
};

ws.onclose = function (event) {
    console.log("Сервер разорвал соединение");
}

ws.onerror = function (event) {
    console.log(event.message);
};