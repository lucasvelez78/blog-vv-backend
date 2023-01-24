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
      success: "http://localhost:3001/feedback", // redirige aquí después de pago exitoso
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

router.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = router;
