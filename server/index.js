// const express = require("express");
// const app = express();
// const port = 4567;

// app.get("/", (req, res) => {
//   sendInvMail({ req, res, html });
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// ---------------------------------------->
// let Parser = require("rss-parser");
// let parser = new Parser();

// (async () => {
//   let feed = await parser.parseURL(process.env.RSS_FEED_URL);
//   console.log(feed);

//   feed.items.forEach((item) => {
//     console.log(item.title + ":" + item.link);

//   });
// })();

// setInterval(() => {

// }, 60000);
// ---------------------------------------->
// const nodeMailer = require("nodemailer");

// let html = `test html`;

// async function sendInvMail({ req, res, html }) {
//   const transport = nodeMailer.createTransport({
//     host: "mail.offer.ge",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "shmagi@offer.ge",
//       pass: ";Ve^Bym.(vR2",
//     },
//   });
//   await transport
//     .sendMail({
//       from: "shmagi@offer.ge",
//       to: "onianishmagi@gmail.com",
//       subject: "New Job Alert",
//       html: html,
//     })
//     .then((info) => {
//       console.log(info);
//       res.send(info);
//     })

//     .catch((err) => {
//       res.send(err);
//     });
// }
// ---------------------------------------->

// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000' // restricts to a specific domain
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from the client
  socket.on('message', (data) => {
    console.log('Message from client:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 3001
const PORT = process.env.PORT || 4018;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
