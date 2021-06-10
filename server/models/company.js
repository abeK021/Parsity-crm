const mongoose = require('mongoose');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true },
  normalizedName: { type: String, required: true },
  owner: String,
  // FRONT END PEOPLE: if you need 'phone' as a number from any endpoints, please tell us! It will be a string otherwise
  phone: String,
  city: String,
  state: String,
  deals: [{ type: Schema.Types.ObjectId, ref: 'Deal' }],
  createdAt: { type: Date, required: true, immutable: true },
  industry: String,
  logo: String,
});

module.exports = mongoose.model('Company', CompanySchema);
