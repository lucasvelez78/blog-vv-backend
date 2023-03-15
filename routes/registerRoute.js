const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const sgMail = require("@sendgrid/mail");

const router = express.Router();

// set mail services

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us9",
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Register user in mailchimp list and send email of confirmation

router.post("/registro", (req, res) => {
  console.log(req.body);

  const addMember = async () => {
    const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.body.name,
      },
    });
    console.log(response);
  };

  addMember();

  const contactMessageReceived = {
    to: req.body.email,
    from: "lucasvelezv@gmail.com",
    subject: "Gracias por registrarte " + req.body.name,
    text: "Tu registro ha sido exitoso. Ahora podrás recibir nuestra newsletter!",
  };
  sgMail
    .send(contactMessageReceived)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
