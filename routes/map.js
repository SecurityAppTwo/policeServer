var express = require("express");
var router = express.Router();

const client = require("./../db");

const kidnappingEvents = "SELECT * FROM kidnapping_event";
const accidentEvents = "SELECT * FROM accident_event";
const shootingEvents = "SELECT * FROM shooting_event";
const stabbingEvents = "SELECT * FROM stabbing_event";
const eventsQueries = [
  kidnappingEvents,
  accidentEvents,
  shootingEvents,
  stabbingEvents
];

router.get("/allEvents", function(req, res) {
  Promise.all(eventsQueries.map(query => client.query(query))).then(results =>
    res.send(results.map(result => result.rows))
  );
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
