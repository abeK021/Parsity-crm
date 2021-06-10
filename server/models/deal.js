const mongoose = require('mongoose');
const ChangeEntry = require('./changeEntry');

const { Schema } = mongoose;

const DealSchema = new Schema({
  name: { type: String, required: true },
  // Update owner when we get to users extension
  owner: String,
  amount: { type: Number, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  stage: { type: String, required: true },
  createdAt: { type: Date, required: true, immutable: true },
  expectedCloseDate: Date,
  stageLastUpdatedAt: { type: Date, required: true },
  stageHistory: [{ type: ChangeEntry.schema }],
  archived: Boolean,
});

module.exports = mongoose.model('Deal', DealSchema);
