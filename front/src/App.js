import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function App() {
  const socketRef = useRef();
  const [feedsArr, setFeedsArr] = useState([]);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5001");
    socketRef.current.on("message", (text) => {
      setFeedsArr(text);
    });
    return () => socketRef.current.disconnect();
  }, []);

  // ---------------------------------------->

  return (
    <div>
      <h1>Simple Node-React Socket Example</h1>
      <div>
        <ol>
          {feedsArr.map((feed) => {
            return (
              <li>
                <h3>
                  <a target="blank" href={feed.link}>{feed.title}</a>
                </h3>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
