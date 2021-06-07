const express = require('express');
const router = express.Router();

const client = require("./../db");

/* GET users listing. */
router.get('/validateUser', (req, res, next) => {
  const { username, password } = req.params;

  client
    .query(`SELECT id FROM activity_user WHERE username=${username} AND password=${password}`)
    .then(result => res.send(result.rowCount > 0))
    .catch(error => res.status(500).send(error))
});

module.exports = router;
