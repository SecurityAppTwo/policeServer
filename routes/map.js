var express = require('express');
var router = express.Router();

import db from "./../db"

const kidnappingEvents = "SELECT * FROM kidnapping_event" ;
const accidentEvents = "SELECT * FROM accident_event" ;
const shootingEvents = "SELECT * FROM shooting_event" ;
const stabbingEvents = "SELECT * FROM stabbing_event" ;

router.get("/allEvents", function(req, res){
  
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/newevent', function(req, res, next))

module.exports = router;
