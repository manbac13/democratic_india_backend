const express = require("express");
const bodyParser = require("body-parser");
const data = require("../Data/winners_2024");

const router = express.Router();

router.use(bodyParser());

router.get("/", (req, res) => {
  try {
    const partyWiseSeats = calculateSeats(data);
    return res.status(200).json({
      success: true,
      data: partyWiseSeats,
      message: "party wise seats fetched successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while fetching data! ${error.message}`,
    });
  }
});

router.get("/forchart", (req, res) => {
  try {
    const partyWiseSeats = calculateSeatsWithOthers(data);
    return res.status(200).json({
      success: true,
      data: partyWiseSeats,
      message: "party wise seats fetched successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while fetching data! ${error.message}`,
    });
  }
});

module.exports = router;
/* ------------------------------------------------------------------------------------- */

const calculateSeats = (data) => {
  const seatCount = data.reduce((acc, curr) => {
    const party = curr.leading_party;
    acc[party] = (acc[party] || 0) + 1;
    return acc;
  }, {});

  // Convert the result into an array of objects
  const arr = Object.entries(seatCount).map(([party, seats]) => ({
    party,
    seats,
  }));
  return arr.sort((a, b) => {
    if (a.party === "Independent") return 1; // Move "Others" to the end
    if (b.party === "Independent") return -1;
    b.seats - a.seats;
  });
};

/* for others ---------------------------------------------------------------------------------------------------------*/
const calculateSeatsWithOthers = (data) => {
  // Step 1: Aggregate the seat counts for each party
  const seatCount = data.reduce((acc, curr) => {
    const party = curr.leading_party;
    acc[party] = (acc[party] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Separate major parties (>=5 seats) and minor parties (<5 seats)
  const result = [];
  let othersSeats = 0;

  for (const [party, seats] of Object.entries(seatCount)) {
    if (seats >= 7 && party !== "Independent") {
      result.push({ party, seats });
    } else {
      othersSeats += seats; // Accumulate seats for "Others"
    }
  }

  // Step 3: Add "Others" to the result if there are any minor parties
  if (othersSeats > 0) {
    result.push({ party: "Others", seats: othersSeats });
  }

  return result.sort((a, b) => {
    if (a.party === "Others") return 1; // Move "Others" to the end
    if (b.party === "Others") return -1;
    return b.seats - a.seats;
  });
};
