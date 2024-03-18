import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import moment from "moment";

function Feeds() {
  const socketRef = useRef();
  const [firstFeedsArr, setFirstFeedsArr] = useState([]);
  const [secondFeedsArr, setSecondFeedsArr] = useState([]);

  let firstFirstElementDate = "";
  let firstSecondElementDate = "";

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

      // let filteredFeeds = feeds.filter((feed) => {
      //   return moment(feed.isoDate).isAfter(dateTenMinEarlier);
      // });

      // let filteredFirstFeeds = [...feeds.firstOne];

      // if (!moment(filteredFirstFeeds[0].isoDate).isSame(firstFirstElementDate)) {
      //   firstFirstElementDate = filteredFirstFeeds[0].isoDate;
      //   setFirstFeedsArr((prev) => [...filteredFirstFeeds]);
      //   showNotification(
      //     filteredFirstFeeds[0].title,
      //     filteredFirstFeeds[0].contentSnippet
      //   );
      // }

      let filteredSecondFeeds = [...feeds.secondOne];

      if (!moment(filteredSecondFeeds[0].isoDate).isSame(firstSecondElementDate)) {
        console.log(moment(filteredSecondFeeds[0].isoDate).isSame(firstSecondElementDate), firstSecondElementDate, "------->", filteredSecondFeeds[0].isoDate);
        firstSecondElementDate = filteredSecondFeeds[0].isoDate;
        setSecondFeedsArr((prev) => [...filteredSecondFeeds]);
        showNotification(
          filteredSecondFeeds[0].title,
          filteredSecondFeeds[0].contentSnippet
        );
      }
    });
  };

  useEffect(() => {
    socketRelationship();

    return () => socketRef.current.disconnect();
  }, []);

  return (
    <div>
      <h1>Feeds List</h1>
      <div style={{display: "flex"}}>
        <ol>
          {firstFeedsArr.map((feed) => {
            return (
              <li key={feed.guid}>
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
        <ol>
          {secondFeedsArr.map((feed) => {
            return (
              <li key={feed.guid}>
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
