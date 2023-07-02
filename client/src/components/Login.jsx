import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {ws} from "../wsClient";

import {ClientChats} from '../Models/Chats'

export let available = true;


export function Login(state) {
    async function manageForm() {
        console.log('manageForm was called')
        state.setIsButtonClicked(true);
        ws.send(JSON.stringify(ID));
        try {
            const result = await fetch('/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"ID": ID})
            });
            const jsonStringResult = await result.text();
            const chats = JSON.parse(jsonStringResult);
            const chatInfos = chats.ChatInfo;
            const lastMessages = chats.LastMessagesTxt;
            ClientChats.pushArrays(chatInfos, lastMessages);
            console.log(`response is: ${chatInfos[0].id}`);

        } catch (ex) {

        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        manageForm().then(res => {});
    }
    const [ID, setID] = useState('')
    return (
        <form onSubmit={handleOnSubmit}>
            <label>
                ID:
                <input type="text" name="name" onChange={(e) => setID(e.target.value)}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>);
}