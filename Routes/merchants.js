const express = require("express");
const bodyParser = require("body-parser");
const Merchants = require("../Models/merchantModel");

const router = express.Router();

router.use(bodyParser());

router.get("/", async (req, res) => {
  const allMerchants = await Merchants.find();
  res.status(200).json({
    success: true,
    data: allMerchants,
    message: "data fetched successfully!",
  });
});

router.post("/", async (req, res) => {
  try {
    const merchantData = await Merchants.create(req.body);
    res.status(200).json({
      success: true,
      data: merchantData,
      message: "merchant has been created successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while creating merchant! ${error.message}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const foundMerchant = await Merchants.findOne({ _id: req.params.id });
    if (foundMerchant) {
      await Merchants.updateOne(foundMerchant, req.body);
      res.status(200).json({
        success: true,
        message: "merchant data has been successfully updated!",
      });
    } else {
      res.status(400).json({
        success: true,
        message: "merchant does not exist!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while updating merchant! ${error.message}`,
    });
  }
});

router.delete('/:id', async(req,res)=>{
  try {
    const foundMerchant = await Merchants.findOne({ _id: req.params.id });
    if (foundMerchant) {
      await Merchants.deleteOne(foundMerchant._id);
      res.status(200).json({
        success: true,
        message: "merchant data has been successfully deleted!",
      });
    } else {
      res.status(400).json({
        success: true,
        message: "merchant does not exist!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `something went wrong while deleting merchant! ${error.message}`,
    });
  }
})
module.exports = router;
