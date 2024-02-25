import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';


function App() {
  const [message, setMessage] = useState('');
  // const [receivedMessage, setReceivedMessage] = useState('');

  // // Listen for messages from the server
  // useEffect(() => {
  //   socket.on('message', (data) => {
  //     setReceivedMessage(data);
  //   });

  //   // Cleanup the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // // Function to send a message to the server
  // const sendMessage = () => {
  //   socket.emit('message', message);
  // };

// ---------------------------------------->




  const socketRef = useRef()
  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5001')
    socketRef.current.on("message", (text) => {
      setMessage(text)
    })
    return () => socketRef.current.disconnect()
  }, [message]);

// ---------------------------------------->




  return (
    <div>
      <h1>Simple Node-React Socket Example</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={message}>Send</button>
      </div>
      <div>
        {/* <p>Received message: {rece  ivedMessage}</p> */}
      </div>
    </div>
  );
}

export default App;
