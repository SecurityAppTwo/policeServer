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

router.post("/addEvent", async function(req, res) {
  const eventDetails = req.body;
  let insertQuery;
  switch (eventDetails.type) {
    case "accident_event":
      insertQuery = `
    INSERT INTO public.accident_event(
    injured, driver, injured_count, date, 
    reported_by, report_date, lon, lat, type)
    VALUES (${"'" + eventDetails.injured + "'"}, ${"'" +
        eventDetails.driver +
        "'"}, ${eventDetails.injured_count}, ${"'" + eventDetails.date + "'"},
       ${eventDetails.reported_by}, ${"'" + eventDetails.report_date + "'"}, ${
        eventDetails.lon
      }, ${eventDetails.lat}, ${"'" + eventDetails.type + "'"});`;
      await client.query(insertQuery);
      res.end();
      break;
    case "kidnapping_event":
      insertQuery = `
      INSERT INTO public.kidnapping_event(
        kidnapper, kidnapped, last_location, date, reported_by, report_date, lon, lat, type)
        VALUES (${"'" + eventDetails.kidnapper + "'"}, ${"'" +
        eventDetails.kidnapped +
        "'"}, ${"'" + eventDetails.last_location + "'"}, ${"'" +
        eventDetails.date +
        "'"},
          ${eventDetails.reported_by}, ${"'" +
        eventDetails.report_date +
        "'"}, ${eventDetails.lon}, ${eventDetails.lat}, ${"'" +
        eventDetails.type +
        "'"});`;
      await client.query(insertQuery);
      res.end();
      break;
    case "shooting_event":
      insertQuery = `
      INSERT INTO public.shooting_event(
      shooter, weapon_type, injured_count, date, reported_by, injured_type, lon, lat, type)
      VALUES (${"'" + eventDetails.shooter + "'"}, ${"'" +
        eventDetails.weapon_type +
        "'"}, ${eventDetails.injured_count}, ${"'" + eventDetails.date + "'"},
        ${eventDetails.reported_by}, ${eventDetails.injured_type}, ${
        eventDetails.lon
      }, ${eventDetails.lat}, ${"'" + eventDetails.type + "'"});`;
      await client.query(insertQuery);
      res.end();
      break;
    case "stabbing_event":
      insertQuery = `
      INSERT INTO public.stabbing_event(
      stabber, weapon_type, injured_count, date, reported_by, injured_type, lon, lat, type)
      VALUES (${"'" + eventDetails.stabber + "'"}, ${"'" +
        eventDetails.weapon_type +
        "'"}, ${eventDetails.injured_count}, ${"'" + eventDetails.date + "'"},
        ${eventDetails.reported_by}, ${eventDetails.injured_type}, ${
        eventDetails.lon
      }, ${eventDetails.lat}, ${"'" + eventDetails.type + "'"});`;
      await client.query(insertQuery);
      res.end();
      break;
  }
});

module.exports = router;
