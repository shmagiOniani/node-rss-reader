import React, { useEffect, useState } from "react";
import Feeds from "./Feeds";

function App() {
  const [showFeeds, setShowFeeds] = useState(false);
  const [notification, setNotification] = useState(null);

  const [notificationPermission, setNotificationPermission] = useState(false);

  const showNotification = () => {
    var options = {
      body: "Notification Body",
      icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "ltr",
    };

    setNotification(new Notification("Hello World", options));
  };

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
    });
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div>
      <h1>Simple Node-React Socket Example</h1>
      <button onClick={() => setShowFeeds(!showFeeds)}>
        {showFeeds ? "Hide Feeds" : "Show Feeds"}
      </button>
      {showFeeds && <Feeds />}

      <div>
        <button onClick={notificationPermission ? ()=> showNotification() : ()=>requestNotificationPermission()}>Show Notification</button>
        {notification && <p>Notification Sent</p>}
      </div>
    </div>
  );
}

export default App;
