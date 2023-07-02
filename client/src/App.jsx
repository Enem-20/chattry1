import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import WebSocket from 'ws';
import {ws} from './wsClient';
import {Login} from './components/Login'
import {ChatList} from './components/Chats';

function App(){
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    //const []
        if(!isButtonClicked){
            return (
                <div className="App">
                    <Login isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked}></Login>
                </div>
            );
        }
        else{
            return (
                <div className="App">
                    <ChatList></ChatList>
                </div>
            );
        }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

export default App;
