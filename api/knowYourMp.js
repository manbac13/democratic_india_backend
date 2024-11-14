const express = require("express");
const bodyParser = require("body-parser");
const winners = require("../Data/winners_2024");

const router = express.Router();

router.use(bodyParser());

router.get("/", (req, res) => {
  try {
    const constituency = req.query.constituency;
    if (constituency) {
      const found = winners.find(
        (item) => item.constituency.toLowerCase() === constituency.toLowerCase()
      );
      return res.status(200).json({
        status: "success",
        data: found || [],
        message: "data fetched successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while deleting merchant! ${error.message}`,
    });
  }
});

module.exports = router;
