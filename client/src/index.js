import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebSocket from 'ws';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const wsPort = 443;
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