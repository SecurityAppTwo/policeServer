var express = require("express");
var router = express.Router();

const client = require("./../db");

const kidnappingEvents = "SELECT * FROM kidnapping_event";
const accidentEvents = "SELECT * FROM accident_event";
const shootingEvents = "SELECT * FROM shooting_event";
const stabbingEvents = "SELECT * FROM stabbing_event";

router.get("/kidnappingEvents", function(req, res) {
  client.query(kidnappingEvents, function(err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    res.send(result.rows);
  });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
