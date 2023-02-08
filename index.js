const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const path = require("path");
const contactUsRoute = require("./routes/contactUsRoute");
const sendBuyNotificationRoute = require("./routes/sendBuyNotificationRoute");
const registerRoute = require("./routes/registerRoute");
const mediaRoute = require("./routes/mediaRoute");
const paymentRoute = require("./routes/paymentRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB -- DB connection -------------------------------------------------
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
  });

// Routes ---------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("express is here");
});

app.use("/", contactUsRoute);

app.use("/", sendBuyNotificationRoute);

app.use("/", registerRoute);

app.use("/media", mediaRoute);

app.use("/purchase", paymentRoute);

app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(3001, function () {
  console.log("express server running in port 3001");
});
