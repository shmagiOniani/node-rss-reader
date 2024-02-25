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

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.80.151:8083"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// ---------------------------------------->
let Parser = require("rss-parser");
let parser = new Parser();

let feedsArr = [];

setInterval(() => {
  (async () => {
  let feed = await parser.parseURL('https://www.upwork.com/ab/feed/jobs/rss?q=%28title%3A%28React%29+OR+title%3A%28Frontend%29+OR+title%3A%28Angular%29+OR+title%3A%28react%29%29&client_hires=1-9%2C10-&verified_payment_only=1&sort=recency&paging=0%3B10&api_params=1&securityToken=2b8186dc354d9557f6d72077c9daad7a629cef6605d91136a3836e4f976c7dfbd617631e91cbff4fc977dea9741343b977a274724a91bbf0af82ec6000761333&userUid=1215517476934246400&orgUid=1215517476942635009');

  // feed.items.forEach((item) => {
  //   console.log(item.title + ":" + item.link);
  //   feedsArr.push(item.title + ":" + item.link);

  // });
  sendMessage(feed.items);

})();
}, 2000);


setInterval(() => {

}, 2000);

io.on("connection", (socket) => {
  console.log("start", socket.id);
});

function sendMessage(data) {
  io.emit("message", data);
}

http.listen(5001, () => console.log("listening to 5001"));
