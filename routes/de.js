var express = require("express");
var router = express.Router();

const client = require("./../db");

const moment = require("moment");

const kidnappingEvents = "SELECT type, date, lon, lat FROM kidnapping_event";
const accidentEvents = "SELECT type, date, lon, lat FROM accident_event";
const shootingEvents = "SELECT type, date, lon, lat FROM shooting_event";
const stabbingEvents = "SELECT type, date, lon, lat FROM stabbing_event";
const allEvents = [kidnappingEvents, accidentEvents, shootingEvents, stabbingEvents];


/*Get request that returns all the events with their dates and x,y coordinates */
router.get('/events', function(req,res) {
Promise.all(allEvents.map(query => client.query(query))).then(results =>
    res.send(results.map(result => result.rows))
);
});


router.get('/dateEvents/:start/:end', function(req,res) {
    var formatter= 'YYYY-MM-DD';
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    var startDate = (moment(start).format(formatter));
    var endDate = (moment(end).format(formatter));
    const kidnapping = "SELECT * FROM kidnapping_event WHERE date BETWEEN '" + startDate + "' AND '" + endDate + "'";
    const shooting = "SELECT * FROM shooting_event WHERE date BETWEEN '" + startDate + "' AND '" + endDate + "'";
    const stabbing = "SELECT * FROM stabbing_event WHERE date BETWEEN '" + startDate + "' AND '" + endDate + "'";
    const accident = "SELECT * FROM accident_event WHERE date BETWEEN '" + startDate + "' AND '" + endDate + "'";
    const events = [kidnapping, shooting, stabbing, accident];
    Promise.all(events.map(query => client.query(query))).then(results =>
        res.send(results.map(result => result.rows))
    );
})


/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
  });

module.exports = router;