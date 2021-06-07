var express = require('express');
var router = express.Router();
const client = require("./../db");


router.post("/add/KidnapEvent", function(req, res) {
    const addKidnapQuery = `INSERT INTO kidnapping_event (
        kidnapper, kidnapped, last_location, date, reprted_by, report_date, lon, lat, type
    )
    VALUES(${req.params.kidnapper},
        ${req.params.kidnapped},
        ${req.params.lastLocation},
        ${req.params.date},
        1,
        ${req.params.reprotDate},
        ${req.params.lon},
        ${req.params.lat},
        "חטיפה"
        )`
    client
    .query()
    .then(() => res.send("Success"))
    .catch(error => res.status(500)
    .send(error? error.message : "error"))
});

router.post("/add/stabbingEvent", function(req, res) {
    const addKidnapQuery = `INSERT INTO stabbing_event (
        stabber, weapon_type, injured_count, date, reprted_by, injured_type, lon, lat, type
    )
    VALUES(${req.params.stabber},
        ${req.params.weaponType},
        ${req.params.injuredCount},
        ${req.params.date},
        1,
        ${req.params.reprotDate},
        ${req.params.lon},
        ${req.params.lat},
        "דקירה"
        )`
        client
    .query()
    .then(() => res.send("Success"))
    .catch(error => res.status(500)
    .send(error? error.message : "error"))
});

router.post("/add/accidentEvent", function(req, res) {
    const addKidnapQuery = `INSERT INTO accident_event (
        injured, driver, injured_count, date, reprted_by, report_date, lon, lat, type
    )
    VALUES(${req.params.injured},
        ${req.params.driver},
        ${req.params.injuredCount},
        ${req.params.date},
        1,
        ${req.params.reprotDate},
        ${req.params.lon},
        ${req.params.lat},
        "תאונה"
        )`
        client
    .query()
    .then(() => res.send("Success"))
    .catch(error => res.status(500)
    .send(error? error.message : "error"))
});

router.post("/add/stabbingEvent", function(req, res) {
    const addKidnapQuery = `INSERT INTO shooting_event (
        shooter, weapon_type, injured_count, date, reprted_by, injured_type, lon, lat, type
    )
    VALUES(${req.params.shooter},
        ${req.params.weaponType},
        ${req.params.injuredCount},
        ${req.params.date},
        1,
        ${req.params.reprotDate},
        ${req.params.lon},
        ${req.params.lat},
        "ירי"
        )`
        client
    .query()
    .then(() => res.send("Success"))
    .catch(error => res.status(500)
    .send(error? error.message : "error"))
})