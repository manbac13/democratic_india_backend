const express = require("express");
//routes
const merchantRoutes = require("./Routes/merchants");
const yourMp = require("./Routes/knowYourMp");
const filters = require("./Routes/filters");

const app = express();

// app.use("/merchant", merchantRoutes);
app.use("/yourmp", yourMp);
app.use("/filters", filters);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, ()=>{
  console.log('server is up on port 5000.')
})

module.exports = app;
