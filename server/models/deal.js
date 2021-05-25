const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DealSchema = new Schema({
  name: { type: String, required: true },
  // Update owner when we get to users extension
  owner: String,
  amount: {type: Number, required: true },
  company: {type: Schema.Types.ObjectId, ref: "Company", required: true},
  stage: {type: String, required: true},
  createdAt: { type: Date, required: true },
  expectedCloseDate: Date,
  stageLastUpdatedAt: {type: Date, required: true},
  isActive: Boolean
});

module.exports = mongoose.model("Deal", DealSchema);