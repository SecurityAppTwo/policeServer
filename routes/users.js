const express = require('express');
const router = express.Router();

const client = require("./../db");

const errorStatusCode = 500;

/* GET users listing. */
router.get('/validateUser', (req, res, next) => {
  const { username, password } = req.query;

  if (!username || !password) {
    res.status(errorStatusCode).send('values werent sent')
  }

  const query = `SELECT id, is_cop FROM activity_user WHERE user_name='${username}' AND password='${password}'`;
  client
    .query(query)
    .then(result => {
      if (result.rowCount > 0){
          res.send({isValid: true, isCop: result.rows[0].is_cop, id : (result.rows)[0].id})
      } else{
        res.send({isValid: false})
      }
    })
    .catch(error => res.status(errorStatusCode).send(error))
});

module.exports = router;
