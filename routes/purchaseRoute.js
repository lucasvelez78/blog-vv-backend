const express = require("express");
const sgMail = require("@sendgrid/mail");

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//send email after purchasing a product

router.post("/purchase", (req, res) => {
  console.log(req.body);
  const message = {
    to: req.body.email,
    from: "lucasvelezv@gmail.com",
    subject: "Compra de: " + req.body.product,
    text:
      req.body.name +
      " ,tu compra ha sido exitosa. Nos comunicaremos contigo por este medio para agendar el encuentro.",
  };
  sgMail
    .send(message)
    .then(() => console.log("Mail-1 sent successfully"))
    .catch((error) => {
      console.error(error);
    });
  const message2 = {
    to: "lucasvelezv@gmail.com",
    from: "lucasvelezv@gmail.com",
    subject: "Compra de: " + req.body.product,
    text:
      req.body.name +
      " ha comprado un servicio. Su emeail es: " +
      req.body.email,
  };
  sgMail
    .send(message2)
    .then(() => console.log("Mail-2 sent successfully"))
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
