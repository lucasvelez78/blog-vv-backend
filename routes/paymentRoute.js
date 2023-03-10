const express = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();

const router = express.Router();

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

router.post("/create", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.name,
        unit_price: Number(req.body.price),
        quantity: 1,
        currency_id: "COP",
      },
    ],
    back_urls: {
      success:
        "https://7fc1-2800-e2-8880-2575-f589-aa78-5446-4d6e.ngrok.io/purchased", // redirige aquí después de pago exitoso
      failure: "http://localhost:3001/feedback",
      pending: "http://localhost:3001/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response);
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
