const router = require('express').Router();
const Company = require('../models/company');
const Deal = require('../models/deal');
const dealStages = require('../dev-data/dealStages');
const ChangeEntry = require('../models/changeEntry');

// For all routes that specify a deal Id, finds the deal and provides it to the route
router.param('id', (req, res, next, id) => {
  Deal.findById(id)
    .populate({ path: 'company' })
    .exec((err, deal) => {
      if (err) {
        return res.status(404).send('No Deal with that ID found');
      }
      req.deal = deal;
      next();
    });
});

// Returns list of deals
// TO-DO: Update so request can specify archived deals for the search object.
router.get('/', (req, res) => {
  const searchObject = {};

  if (req.query.stage) {
    searchObject.stage = req.query.stage;
  }

  Deal.find(searchObject)
    .populate('company')
    .exec((err, dealResults) => {
      if (err) {
        console.error(err);
        res.end();
      }
      res.send(dealResults);
    });
});

// Returns a list of active deals sorted into respective stage arrays.
router.get('/by-stage', (req, res) => {
  // Creates an object where each property is an object for a particular deal stage (e.g. {name: "Initiated", items: [Deals currently in initiated stage]})
  const resultsObj = dealStages.reduce(
    (acc, stageName) => ({
      ...acc,
      [stageName]: { name: stageName, items: [] },
    }),
    {}
  );
  const searchObject = { archived: false };
  const propertiesToReturn =
  'amount name stage company expectedCloseDate createdAt stageLastUpdatedAt';
  if (req.query.min) {
    searchObject.amount = { $gte: Number(req.query.min) };
  }
  if (req.query.max) {
    searchObject.amount = {
      ...searchObject.amount,
      $lte: Number(req.query.max),
    };
  }
  if (req.query.recent) {
    const currentDate = new Date();
    const OneMonthAgo = currentDate.setMonth(currentDate.getMonth() - 1);
    searchObject.createdAt = { $gte: OneMonthAgo };
  }
  if (req.query.company) {
    searchObject.company = { _id: req.query.company };
  }
  Deal.find(searchObject, propertiesToReturn)
    .populate({ path: 'company', select: 'name' })
    .sort({stageLastUpdatedAt: -1})
    .exec()
    .then((dealResults) => {
      const dealsSortedByStage = dealResults.reduce((acc, deal) => {
        deal.id = deal._id;
        acc[deal.stage].items.push(deal);
        return acc;
      }, resultsObj);
      res.send(dealsSortedByStage);
    });
});

// Adds a new deal to the database
router.post('/', (req, res) => {
  const newDeal = new Deal(req.body);
  newDeal.stage = req.body.stage || 'Initiated';
  newDeal.createdAt = new Date();
  newDeal.stageLastUpdatedAt = new Date();
  newDeal.archived = false;
  newDeal.expectedCloseDate = req.body.expectedCloseDate || null;

  const firstEntry = new ChangeEntry({
    user: '',
    timeStamp: new Date(),
    newValue: newDeal.stage,
    deal: newDeal._id,
  });
  newDeal.stageHistory.push(firstEntry);
  newDeal
    .save()
    .then((dealSaved) => Company.findById(dealSaved.company).exec())
    .then((companyMatch) => {
      companyMatch.deals.push(newDeal._id);
      return companyMatch.save();
    })
    .then(() => {
      res.send('Deal successfully saved to database');
    })
    .catch((err) => {
      console.error(err);
      if (err.errors.company) {
        return res.status(404).send('Provided company for deal not found');
      }
      res.status(400).send('error, entry not saved');
    });
});

// Returns the specific deal matching the id provided
router.get('/:id', (req, res) => {
  res.send(req.deal);
});

// Used to update the stage of the deal with the provided id.
// TO-DO: Maybe update the endpoint to be /:id/stage
router.put('/:id', (req, res) => {
  const { deal } = req;
  if (!req.body.stage) {
    return res.send('stage not provided, must provide stage for update');
  }
  if (deal.stage === req.body.stage) {
    return res.send('existing stage provided in put request. check actions');
  }
  if (!dealStages.includes(req.body.stage)) {
    return res.send('invalid stage provided, check dealstages for details');
  }
  deal.stage = req.body.stage;
  const newChangeEntry = new ChangeEntry({
    timeStamp: new Date(),
    deal: deal._id,
    newValue: deal.stage,
  });
  deal.stageHistory.push(newChangeEntry);
  deal.stageLastUpdatedAt = newChangeEntry.timeStamp;
  deal
    .save()
    .then(() => {
      res.redirect(303, '/deals/by-stage');
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// The general endpoint to update any of a deals mutable properties except for the stage (stage can only be updated at PUT /:id)
// TO-DO: Put in a check so that the stage can not be updated by this endpoint. Or if it can be updated then make sure a change entry is created here.
router.put('/:id/update', (req, res) => {
  const { deal, body } = req;

  for (const prop of Object.keys(body)) {
    deal[prop] = body[prop];
  }

  deal
    .save()
    .then((dealWithUpdates) => {
      res.redirect(303, `/deals/${dealWithUpdates._id}`);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// Deletes the deal from the database
// TO-DO: Make sure it removes the deal from the deals array in the corresponding company document as well.
router.delete('/:id', (req, res) => {
  const { deal } = req;
  // companyForDeal.deals = companyForDeal.deals.filter((deal) => deal !== req.deal._id)
  Deal.deleteOne(deal)
    .then(() => {
      res.send('Deal successfully deleted');
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

module.exports = router;
