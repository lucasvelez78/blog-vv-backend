const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const router = express.Router();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us9",
});

//Register user in mailchimp list

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
});

module.exports = router;
