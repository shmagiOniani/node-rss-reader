import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4018');

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  // Listen for messages from the server
  useEffect(() => {
    socket.on('message', (data) => {
      setReceivedMessage(data);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to send a message to the server
  const sendMessage = () => {
    socket.emit('message', message);
  };

  return (
    <div>
      <h1>Simple Node-React Socket Example</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <p>Received message: {receivedMessage}</p>
      </div>
    </div>
  );
}

export default App;
