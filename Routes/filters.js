const express = require("express");
const bodyParser = require("body-parser");
const data = require("../Data/general_election_2024");

const router = express.Router();

router.use(bodyParser());

/* ---------------------------GET ALL STATES FOR FILTERS--------------------------------------- */
router.get("/getAllStates", (req, res) => {
  try {
    const allStates = returnUniqueValues(data, req.body.state);
    return res.status(200).json({
      status: true,
      data: allStates,
      message: "states have been fetched!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while fetching states! ${error.message}`,
    });
  }
});
/* ---------------------------------^^^^^^^^^^^^^^^--------------------------------------------- */

/* ---------------GET ALL CONSTITUENCIES BASED ON STATES---------------------------------------- */
router.get("/getAllPCNames", (req, res) => {
  try {
    const allPcInState = getUniquePCNamesByState(data, req.body.state);
    return res.status(200).json({
      status: true,
      data: allPcInState,
      message: "PC have been fetched!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while PC's! ${error.message}`,
    });
  }
});
/* -------------------------------------------------------------------------------------------- */

/* --------------------GET CANDIDATES LIST PC WISE ---------------------------------------------*/
router.get("/getAllCandidates", (req, res) => {
  try {
    const allCandidatesInPc = getAllCandidatesinpc(
      data,
      req.body.state,
      req.body.pcname
    );
    return res.status(200).json({
      status: true,
      data: allCandidatesInPc,
      message: "All candidates in PC have been fetched!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while fetching all candidates! ${error.message}`,
    });
  }
});
/* -------------------------------------------------------------------------------------------- */

module.exports = router;

/* -------------------------------functions--------------------------------------------- */

const returnUniqueValues = (data, field_name) => {
  const uniqueValues = [...new Set(data.map((item) => item[`${field_name}`]))];
  return uniqueValues;
};

function getUniquePCNamesByState(data, stateName) {
  const filteredData = data.filter((item) => item.state === stateName);
  const uniquePCNames = [...new Set(filteredData.map((item) => item.pc_name))];
  return uniquePCNames;
}

function getAllCandidatesinpc(data, state, pcname) {
  const filteredData = data.filter(
    (item) => item.state === state && item.pc_name === pcname
  );
  return filteredData;
}
