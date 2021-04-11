import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { useEffect } from 'react';
import Pusher from 'pusher-js';

function App() {
  useEffect(() => {
    var pusher = new Pusher('<key>', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages'); // use pusher channel name -messages
    channel.bind('inserted', function(data) { // event name - insert
      alert(JSON.stringify(data));
    });
  },[])

  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      <Chat />
      </div>
    </div>
  );
}

export default App;
