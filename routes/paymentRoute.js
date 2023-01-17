const express = require("express");
const mercadopago = require("mercadopago");

const router = express.Router();

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

router.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:3001/feedback",
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
