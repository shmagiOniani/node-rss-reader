import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function Feeds() {
    const socketRef = useRef();
    const [feedsArr, setFeedsArr] = useState([]);
  
    useEffect(() => {
      socketRef.current = io.connect("http://localhost:5001");
      socketRef.current.on("message", (feeds) => {
        if(feeds[0].title === feedsArr[0]?.title) return;
        setFeedsArr(feeds);
      });
      return () => socketRef.current.disconnect();
    }, []);
  
  return (
    <div>
         <h1>Feeds List</h1>
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
  )
}

export default Feeds