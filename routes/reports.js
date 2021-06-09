var express = require("express");
var router = express.Router();
const client = require("./../db");
const moment = require("moment");
const sendEventsToAll = require("./subscription.js");

router.post("/add/kidnapEvent", function(req, res) {
  var formatter = "YYYY-MM-DD";
  var start = new Date(req.body.date);
  var end = new Date(req.body.reportDate);
  var date = moment(start).format(formatter);
  var reportDate = moment(end).format(formatter);
  const addKidnapQuery = `INSERT INTO kidnapping_event (
        kidnapper, kidnapped, last_location, date, reported_by, report_date, lon, lat, type
    )
    VALUES('${req.body.kidnapper}',
        '${req.body.kidnapped}',
        '${req.body.lastLocation}',
        '${date}',
        '${req.body.reportedBy}',
        '${reportDate}',
        '${req.body.lon}',
        '${req.body.lat}',
        'חטיפה'
        )`;
  client
    .query(addKidnapQuery)
    .then(() => res.send("Success"))
    .then(() => sendEventsToAll({ ...req.body, type: "חטיפה" }))
    .catch(error => res.status(500).send(error ? error.message : "error"));
});

router.post("/add/stabbingEvent", function(req, res) {
  var formatter = "YYYY-MM-DD";
  var start = new Date(req.body.date);
  var date = moment(start).format(formatter);
  const addStabbingQuery = `INSERT INTO stabbing_event (
        stabber, weapon_type, injured_count, date, reported_by, injured_type, lon, lat, type
    )
    VALUES('${req.body.stabber}',
        '${req.body.weaponType}',
        ${req.body.injuredCount},
        '${date}',
        '${req.body.reportedBy}',
        '${req.body.injuredType}',
        '${req.body.lon}',
        '${req.body.lat}',
        'דקירה'
        )`;
  client
    .query(addStabbingQuery)
    .then(() => res.send("Success"))
    .then(() => sendEventsToAll({ ...req.body, type: "דקירה" }))
    .catch(error => res.status(500).send(error ? error.message : "error"));
});

router.post("/add/accidentEvent", function(req, res) {
  var formatter = "YYYY-MM-DD";
  var start = new Date(req.body.date);
  var end = new Date(req.body.reportDate);
  var date = moment(start).format(formatter);
  var reportDate = moment(end).format(formatter);
  const addAccidentQuery = `INSERT INTO accident_event (
        injured, driver, injured_count, date, reported_by, report_date, lon, lat, type
    )
    VALUES('${req.body.injured}',
        '${req.body.driver}',
        ${req.body.injuredCount},
        '${date}',
        ${req.body.reportedBy},
        '${reportDate}',
        ${req.body.lon},
        ${req.body.lat},
        'תאונה'
        )`;
  client
    .query(addAccidentQuery)
    .then(() => sendEventsToAll({ ...req.body, type: "תאונה" }))
    .then(() => res.send("Success"))
    .catch(error => res.status(500).send(error ? error.message : "error"));
});

router.post("/add/shootingEvent", function(req, res) {
  var formatter = "YYYY-MM-DD";
  var start = new Date(req.body.date);
  var date = moment(start).format(formatter);
  const addShootingQuery = `INSERT INTO shooting_event (
        shooter, weapon_type, injured_count, date, reported_by, injured_type, lon, lat, type
    )
    VALUES('${req.body.shooter}',
        '${req.body.weaponType}',
        ${req.body.injuredCount},
        '${req.body.date}',
        ${req.body.reportedBy},
        '${req.body.injuredType}',
        ${req.body.lon},
        ${req.body.lat},
        'ירי'
        )`;
  client
    .query(addShootingQuery)
    .then(() => res.send("Success"))
    .then(() => sendEventsToAll({ ...req.body, type: "ירי" }))
    .catch(error => {
      console.log(error.message);
      res.status(500).send(error ? error.message : "error");
    });
});

const kidnappingEvents =
  "SELECT type, last_location , date FROM kidnapping_event ORDER BY date";
const accidentEvents =
  "SELECT type, injured_count ,date FROM accident_event ORDER BY date";
const shootingEvents =
  "SELECT type, injured_count , date FROM shooting_event ORDER BY date";
const stabbingEvents =
  "SELECT type, injured_count , date FROM stabbing_event ORDER BY date";
const allEvents = [
  kidnappingEvents,
  accidentEvents,
  shootingEvents,
  stabbingEvents
];

/*Get request that returns all the events with their dates and x,y coordinates */
router.get("/allEventsReported", function(req, res) {
  Promise.all(allEvents.map(query => client.query(query))).then(results =>
    res.send(results.map(result => result.rows))
  );
});

module.exports = router;
