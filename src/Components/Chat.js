import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import "./css/Chat.css";
import axios from "../axios";

const Chat = ({messages}) => {
    const [seed, setSeed] = useState()
    const [input, setInput] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();
       await  axios
        .post('./messages/new',{
            "message":input,
            "name":"Demo Name",
            "timestamp":new Date().toUTCString(),
            "received":false
        })
        setInput("")
    }

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000))
    },[])
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at ..</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        { new Date().toUTCString()}
                    </span>
                </p>
                ))}

            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form action="">
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="type a message" type="text"/>
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    );
};

export default Chat;