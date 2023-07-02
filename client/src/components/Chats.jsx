import React, {useState} from 'react';
import {ClientChats} from '../Models/Chats'

function onClick() {
    this.setState({color: 'red'});
}

export function ChatList() {
    console.log('chatList called');
    let arr = ClientChats.getRaw();
    let buf = arr;

    for(let i = 0; i < arr.length; ++i){
        console.log(arr[i]);
        if(arr[i] !== undefined)
            buf.push(arr[i]);
        else
            buf.push(null);
    }
    console.log(buf);
    return (
        <ul>
            {buf.map((data) => <li key={data.LastMessage.MessageTxt}>{data.LastMessage.MessageTxt}</li>)}
        </ul>);
}