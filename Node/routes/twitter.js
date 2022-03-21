var express = require("express");
var router = express.Router();
var twitterController = require("../controllers/twitter");
router.get("/", twitterController.getDetails);
router.post("/", twitterController.createDetails);
router.delete("/:indexToDelete", twitterController.deleteDetails);
router.get("/deleteall", twitterController.deleteAll);
module.exports = router;
