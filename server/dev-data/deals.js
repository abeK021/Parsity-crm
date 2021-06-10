const faker = require('faker');
const Company = require('../models/company');
const Deal = require('../models/deal');
const stageOptions = require('./dealStages');

const generateDeals = async (archived) => {
  const companyOptions = await Company.find({}).exec();
  const deals = [];
  for (let i = 0; i < 10; i += 1) {
    const deal = {};
    deal.name = faker.fake(
      '{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}'
    );
    deal.amount = Number(faker.finance.amount());
    deal.createdAt = faker.date.past(1);
    deal.stageLastUpdatedAt = faker.date.between(deal.createdAt, new Date());
    deal.expectedCloseDate = faker.date.future();
    deal.archived = archived;
    deal.stage = stageOptions[Math.floor(Math.random() * 5)];
    deal.company = companyOptions[Math.floor(Math.random() * 10)];

    const newDeal = new Deal(deal);
    await newDeal.save();
    const companyForDeal = await Company.findById(newDeal.company._id).exec();
    companyForDeal.deals.push(newDeal);
    companyForDeal.save();
    deals.push(newDeal);
  }
  return deals;
};

module.exports = generateDeals;
