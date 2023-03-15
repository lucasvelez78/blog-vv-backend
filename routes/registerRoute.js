const express = require("express");
const sgMail = require("@sendgrid/mail");

const router = express.Router();

// set mail services

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//send email of confirmation

router.post("/registro", (req, res) => {
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
