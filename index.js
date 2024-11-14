const express = require("express");
//routes
const merchantRoutes = require("./Routes/merchants");
const yourMp = require('./Routes/knowYourMp')

const app = express();

// app.use("/merchant", merchantRoutes);
app.use("/yourmp", yourMp);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server is active on port 5000");
});
