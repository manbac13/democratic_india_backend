const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/");

const Schema = mongoose.Schema;

const merchantSchema = new Schema({
  owner_name: { type: String, required: true },
  email: { type: String, required: true },
  entity_name: { type: String, required: true },
  town_name: { type: String, required: true },
  location: { type: String, required: true },
  phone_number: { type: String, required: true },
  category: { type: String, required: true },
});

const merchants = mongoose.model("merchants", merchantSchema);
module.exports = merchants;
