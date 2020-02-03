const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_profile"
  },
  programIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "eligibility_programs" }
  ]
});

module.exports = mongoose.model("eligibility_profile", programSchema);
