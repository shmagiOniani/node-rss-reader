import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import moment from "moment";

function Feeds() {
  const socketRef = useRef();
  const [feedsArr, setFeedsArr] = useState([]);

  let firstElementDate = '';

  const EARLY_THEN_DATE = 30;
  const SOCKET_SERVER_URL = "http://localhost:5001";

  const showNotification = (title, body) => {
    var options = {
      body,
      icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "ltr",
    };

    new Notification(title, options);
  };

  const socketRelationship = () => {
    socketRef.current = io.connect(SOCKET_SERVER_URL);
    socketRef.current.on("message", (feeds) => {
      
      let newDate = new Date().toISOString();
        let dateTenMinEarlier = moment(newDate).subtract(
          EARLY_THEN_DATE,
          "minutes"
        );



        let filteredFeeds = feeds.filter((feed) => {
          return moment(feed.isoDate).isAfter(dateTenMinEarlier);
        });

        console.log(moment(feeds[0].isoDate).isSame(feedsArr[0]?.isoDate));
        
        console.log(feeds[0].isoDate);
        console.log(feedsArr[0]?.isoDate);
        console.log(feedsArr);
        if (!moment(feeds[0].isoDate).isSame(firstElementDate)) {
          firstElementDate = feeds[0].isoDate;
          setFeedsArr((prev)=> [...filteredFeeds]);
          showNotification(feeds[0].title, feeds[0].contentSnippet);
      }
    });
  };

  useEffect(() => {
    socketRelationship();

    return () => socketRef.current.disconnect();
  },[]);

  return (
    <div>
      <h1>Feeds List</h1>
      <div>
        <ol>
          {feedsArr.map((feed) => {
            return (
              <li key={feed.isoDate}>
                <h3>
                  <a target="blank" href={feed.link}>
                    {feed.title}
                  </a>
                  {moment(feed.isoDate).fromNow()}
                </h3>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Feeds;
