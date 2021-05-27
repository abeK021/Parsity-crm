const mongoose = require("mongoose");
const router = require("express").Router();
const Company = require("../models/company");
const companies = require("../dev-data/companies");
const Deal = require("../models/deal");
const deals = require("../dev-data/deals");

router.param("id", (req, res, next, id) => {
  Company.findById(id).populate({path: "deals"}).exec((err, company) => {
    if(err) {
      return res.status(404).send("No Company with that ID found");
    }
    req.company = company;
    next();
  })
})

router.get("/", (req, res) => {
  const perPage = 5;
  const page = req.query.page || 1;
  const query = {};

  const countPromise = Company.find(query).countDocuments().exec();

  const resultPromise = Company.find(query)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate({path: "deals"})
    .exec()

  Promise.all([countPromise, resultPromise])
    .then(resultsWithCount => {
      const [totalResultsCount, companies] = resultsWithCount;
      res.send({ companies, totalResultsCount });
    })
    .catch(err =>{
      console.error(err);
      res.end();
    })
})

router.post("/", (req, res) => {
  if(!req.body.name) {
    res.status(400).send("Name field is required");
  }
  const newCompany = new Company(req.body);
  newCompany.deals = [];
  newCompany.createdAt = new Date();
  newCompany.save().then(savedCompany => {
    res.send(savedCompany);
  }).catch(err => {
    console.error(err);
    res.end();
  }) 
})

router.get("/:id", (req, res) => {
  res.send(req.company);
})

router.put("/:id", (req, res) => {
  const company = req.company;
  for (prop in req.body) {
    company[prop] = req.body[prop];
  }
  company.save()
    .then(updatedCompany => {
      res.send(updatedCompany);
    })
    .catch((err) => {
      console.error(err);
    })
})

router.delete("/:id", (req, res) => {
  Company.deleteOne(req.company)
    .then(() => {
      res.send("Company successfully deleted");
    })
    .catch(err => {
      console.error(err);
      res.end();
    })
})

module.exports = router;