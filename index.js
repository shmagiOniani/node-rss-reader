

// let Parser = require("rss-parser");
// let parser = new Parser();

// (async () => {
//   let feed = await parser.parseURL(
//     "https://www.upwork.com/ab/feed/jobs/rss?q=%28title%3A%28React%29+OR+title%3A%28Frontend%29+OR+title%3A%28Angular%29+OR+title%3A%28react%29%29&client_hires=1-9%2C10-&verified_payment_only=1&sort=recency&paging=0%3B10&api_params=1&securityToken=2b8186dc354d9557f6d72077c9daad7a629cef6605d91136a3836e4f976c7dfbd617631e91cbff4fc977dea9741343b977a274724a91bbf0af82ec6000761333&userUid=1215517476934246400&orgUid=1215517476942635009"
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
  host: "smtp.example.com",
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
