const { body, validationResult } = require("express-validator");
let details = [
  {
    title: "Australia Cricket Board",
    body: "Australian mens cricket team is working really hard",
    date_of_creation: 1647860807440,
    author: "Justin Langer",
    category: "sports",
  },
  {
    title: "Film Festival",
    body: "RRR promotions are going on at a rapid speed",
    date_of_creation: 1647860807440,
    author: "Candice",
    category: "Entertainment",
  },
];
const getDetails = (req, res) => {
  res.json(details);
};
const createDetails = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("min length should be 5 and max length should be 50")
    .isAlphanumeric()
    .withMessage(
      "Only alphabets and numbers are allowed. No special characters are allowed"
    ),
  body("body")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("min length should be 5 and max length should be 200")
    .escape(),
  body("author")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("min length should be 5 and max length should be 100")
    .isAlphanumeric()
    .withMessage(
      "Only alphabets and numbers are allowed. No special characters are allowed"
    )
    .escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { title, body, date_of_creation, author, category } = req.body;
      details.push({ title, body, date_of_creation, author, category });
      res.json({ status: "Adding new details" });
    }
  },
];
const deleteDetails = (req, res) => {
  console.log(req.params.indexToDelete);
  let newDetails = details.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      return false;
    } else {
      return true;
    }
  });
  details = newDetails;
  res.json({ status: "Successfully deleted details" });
};
const deleteAll = (req, res) => {
  details = [];
  res.send({ status: "All details are deleted" });
};
module.exports = { getDetails, createDetails, deleteDetails, deleteAll };
