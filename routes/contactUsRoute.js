const express = require("express");
const sgMail = require("@sendgrid/mail");

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//send email from contactUs

router.post("/contact", (req, res) => {
  console.log(req.body);
  const contactMessage = {
    to: "lucasvelezv@gmail.com",
    from: "lucasvelezv@gmail.com",
    subject: "Mensaje desde contáctanos: " + req.body.name,
    text:
      "El email del usuario es:  " + req.body.email + "... " + req.body.message,
  };
  const contactMessageReceived = {
    to: req.body.email,
    from: "lucasvelezv@gmail.com",
    subject: "Gracias por contactarnos " + req.body.name,
    text: "Revisaremos tu petición y nos contactaremos contigo muy pronto.",
  };

  sgMail
    .send(contactMessage)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => {
      console.error(error);
    });
  sgMail
    .send(contactMessageReceived)
    .then(() => console.log("Mail sent successfully"))
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
