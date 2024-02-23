const express = require('express');
const app = express();
const port = 4567;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// let Parser = require("rss-parser");
// let parser = new Parser();

// (async () => {
//   let feed = await parser.parseURL(
//     ""
//   );
//   console.log(feed);

//   feed.items.forEach((item) => {
//     console.log(item.title + ":" + item.link);

   

//   });
// })();

// setInterval(() => {

// }, 60000);

const nodeMailer = require("nodemailer");

let html = `test html`;

let transporter = nodeMailer.createTransport({
  host: "localhost:4567",
  port: 587,
  secure: false,
  auth: {
    user: "onianishmagi@gmail.com",
    pass: "pwd",
  },
});

let mailOptions = {
    from: "onianishmagi@gmail.com",
    to: "natiaa.tabatadze@gmail.com",
    subject: "New Job Alert",
    html: html,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
