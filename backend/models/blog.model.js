const mongoose = require("mongoose");
const db = require("../config/database");
const ReceiptSchema = mongoose.Schema({
  Items: {
    type: Array
  },
  Prices: {
    type: Array
  }
});


let check  = mongoose.model("Receipt", ReceiptSchema);
module.exports = check;
