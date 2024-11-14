const express = require("express");
//routes
const merchantRoutes = require("./Routes/merchants");
const yourMp = require("./Routes/knowYourMp");

const app = express();

// app.use("/merchant", merchantRoutes);
app.use("/yourmp", yourMp);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
