const express = require("express");
//routes
const yourMp = require("./Routes/knowYourMp");
const filters = require("./Routes/filters");
const results = require("./Routes/winners");
const statewisedata = require("./Routes/stateWise")
const cors = require("cors");

const app = express();
app.use(cors());

// app.use("/merchant", merchantRoutes);
app.use("/yourmp", yourMp);
app.use("/filters", filters);
app.use("/results", results);
app.use("/statewise", statewisedata)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("server is up on port 5000.");
});

module.exports = app;
