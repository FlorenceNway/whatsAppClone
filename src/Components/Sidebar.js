import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./css/Sidebar.css";
import React from 'react';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className='sidebar__header'>
                <Avatar src="https://avatars.githubusercontent.com/u/38194222?s=200&v=2"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                <SearchOutlined/>
                <input placeholder="Search or start new chat" type="text"></input>
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat addNewChat  />
                <SidebarChat/>
            </div>
        </div>
    );
};

export default Sidebar;