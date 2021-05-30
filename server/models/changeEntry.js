const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeEntrySchema = new Schema({
  user: String,
  timeStamp: { type: Date, required: true },
  newValue: { type: Schema.Types.Mixed, required: true },
  deal: { type: Schema.Types.ObjectId, required: true, ref: "Deal" }
  //types of changes 1. stage 2. salesman add or remove 3. change amount 4. change name of deal 5. 
});
 
module.exports = mongoose.model("ChangeEntry", ChangeEntrySchema);