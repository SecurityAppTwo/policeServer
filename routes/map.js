var express = require('express');
var router = express.Router();

const { Client } = require('pg')
const client = require('./../db')

const kidnappingEvents = "SELECT * FROM kidnapping_event" ;
const accidentEvents = "SELECT * FROM accident_event" ;
const shootingEvents = "SELECT * FROM shooting_event" ;
const stabbingEvents = "SELECT * FROM stabbing_event" ;

router.get("/allEvents", function(req, res){
  client.query(kidnappingEvents, function (err, result) {
    if (err) {
      console.log(err.message);
      throw err;
    }
    res.send(result);
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.post('/newevent', function(req, res, next) {
//   req.
// })

module.exports = router;
