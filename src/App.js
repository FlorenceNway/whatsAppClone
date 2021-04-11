import './App.css';
import { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Pusher from 'pusher-js';
import axios from './axios.js';

function App() {
  const [messages, setMessages] = useState([]);

// to fetch all initial inoformation
  useEffect(() => {
    axios
    .get('./messages/sync')
    .then(response => {
      setMessages(response.data)
    })
  },[])

  useEffect(() => {
    var pusher = new Pusher('fd4103a6438ae7bf1733', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages'); // use pusher channel name -messages
    channel.bind('inserted', function(newMessage) { // event name - insert
      setMessages([...messages, newMessage])
    });

    // even messages change, to make sure one subscriber at a time to listen (if huge group chat, it can be many messages to listen when multi users send)
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  },[messages])

  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
