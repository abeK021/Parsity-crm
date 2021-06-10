const router = require('express').Router();
const Company = require('../models/company');
const Deal = require('../models/deal');

// For all routes that specify a company Id, finds the company and provides it to the route
router.param('id', (req, res, next, id) => {
  Company.findById(id)
    .populate({ path: 'deals', match: { archived: false } })
    .exec((err, company) => {
      if (err) {
        return res.status(404).send('No Company with that ID found');
      }
      req.company = company;
      next();
    });
});

// Provides a paginated list of companies
router.get('/', (req, res) => {
  const perPage = 5;
  const page = req.query.page || 1;
  const query = {};
  if (req.query.name) {
    query.normalizedName = {
      $regex: req.query.name.toLowerCase(),
      $options: 'i',
    };
  }
  const sortOrder =
    req.query.sort === 'asc' || req.query.sort === 'desc'
      ? { normalizedName: req.query.sort }
      : {};

  const countPromise = Company.find(query).countDocuments().exec();

  const resultPromise = Company.find(query)
    .sort(sortOrder)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate({ path: 'deals' })
    .exec();

  Promise.all([countPromise, resultPromise])
    .then((resultsWithCount) => {
      const [totalResultsCount, companies] = resultsWithCount;
      res.send({ companies, totalResultsCount });
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// Provides list of all the company names in the user's list
router.get('/list', (_req, res) => {
  Company.find({}, 'normalizedName name')
    .sort({ normalizedName: 1 })
    .exec((_err, companiesList) => {
      res.send(companiesList);
    });
});

// Adds a new company to the database
// TO-DO: Do we need to send saved company or simply a message stating company was successfully saved?
router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Name field is required');
  }
  const newCompany = new Company(req.body);
  newCompany.normalizedName = req.body.name.toLowerCase();
  newCompany.deals = [];
  newCompany.createdAt = new Date();
  newCompany.logo = newCompany.logo || '';
  newCompany
    .save()
    .then((savedCompany) => {
      res.send(savedCompany);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// Returns the specific company matching the id provided
router.get('/:id', (req, res) => {
  res.send(req.company);
});

// Edits the company information matching the id provided
router.put('/:id', (req, res) => {
  const { company, body } = req;

  for (const prop of Object.keys(body)) {
    company[prop] = body[prop];
  }

  company.normalizedName = company.name.toLowerCase();

  company
    .save()
    .then((updatedCompany) => {
      res.send(updatedCompany);
    })
    .catch((err) => {
      console.error(err);
    });
});

// Deletes the company matching the id provided
// TO-DO: We may not want a delete company route, more like archive company
router.delete('/:id', (req, res) => {
  Company.deleteOne({ _id: req.company._id })
    .then(() => Deal.deleteMany({ company: req.company._id }))
    .then(() => {
      res.send('Company and deals successfully deleted');
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

module.exports = router;
