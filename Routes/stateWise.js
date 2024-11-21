const express = require("express");
const bodyParser = require("body-parser");
const data = require("../Data/state_wise_seats");
const router = express.Router();

router.use(bodyParser());

router.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: data,
      message: "state wise data fetched successully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while fetching data! ${error.message}`,
    });
  }
});

module.exports = router
