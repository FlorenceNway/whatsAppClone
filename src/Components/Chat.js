import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import "./css/Chat.css";

const Chat = ({messages}) => {
    const [seed, setSeed] = useState('')

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
                    <input placeholder="type a message" type="text"/>
                    <button type='submit'>Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    );
};

export default Chat;