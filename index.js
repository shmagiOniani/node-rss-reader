const express = require("express");
const app = express();
const port = 4567;

app.get("/", (req, res) => {
  sendInvMail({ req, res, html });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

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

const nodeMailer = require("nodemailer");

let html = `test html`;

async function sendInvMail({ req, res, html }) {

  const transport = nodeMailer.createTransport({
    host: "mail.offer.ge",
    port: 587,
    secure: false,
    auth: {
      user: "shmagi@offer.ge",
      pass: ";Ve^Bym.(vR2",
    },
  });
  await transport.sendMail({
    from: "shmagi@offer.ge",
    to: "onianishmagi@gmail.com",
    subject: "New Job Alert",
    html: html,
  }).then((info) => {
    console.log(info);
    res.send(info);
  })
  
  .catch((err) => {
    res.send(err);
  }
  );
  

}
