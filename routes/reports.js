var express = require("express");
var router = express.Router();
const client = require("./../db");
const moment = require("moment");
// const sendEventsToAll = require("./subscription.js");

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
    .then(() => sendEventsToAll({ ...req.body, type: "חטיפה" }))
    .then(() => res.send("Success"))
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
    .then(() => sendEventsToAll({ ...req.body, type: "דקירה" }))
    .then(() => res.send("Success"))
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
    .then(() => sendEventsToAll({ ...req.body, type: "ירי" }))
    .then(() => res.send("Success"))
    .catch(error => {
      console.log(error.message);
      res.status(500).send(error ? error.message : "error");
    });
});

const kidnappingEvent = "SELECT * FROM kidnapping_event ORDER BY date";
const accidentEvents = "SELECT * FROM accident_event ORDER BY date";
const shootingEvents = "SELECT * FROM shooting_event ORDER BY date";
const stabbingEvents = "SELECT * FROM stabbing_event ORDER BY date";
const allEvents = [
  kidnappingEvent,
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

const kidnappingEventsJoin = `SELECT * FROM activity_user`;
const accidentEventsJoin = `SELECT * FROM activity_user`;
const shootingEventsJoin = `SELECT * FROM activity_user`;
const stabbingEventsJoin = `SELECT * FROM activity_user`;
const allEventsJoin = [
  kidnappingEventsJoin,
  accidentEventsJoin,
  shootingEventsJoin,
  stabbingEventsJoin
];

router.get("/usersNameReports", function(req, res) {
  Promise.all(allEventsJoin.map(query => client.query(query))).then(results =>
    res.send(results.map(result => result.rows))
  );
});

let clients = [];
let facts = [];

function eventsHandler(request, response, next) {
  console.log("eventsHandler");
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache"
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);
  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

router.get("/subscribe", eventsHandler);

router.get("/status", (request, response) =>
  response.json({ clients: clients.length })
);

const sendEventsToAll = newFact => {
  console.log("sendEventsToAll");
  clients.forEach(client => {
    client.response.write(`data: ${JSON.stringify(newFact)}\n\n`);
  });
};

module.exports = router;
