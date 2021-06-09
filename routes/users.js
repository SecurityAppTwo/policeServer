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
      console.log(result)
      if (result.rowCount > 0){
        if ((result.rows)[0].isCop){
          res.send({isValid: true, id : (result.rows)[0].id})
        } else{
          res.send({isValid: false})
        }
      } else{
        res.send({isValid: false})
      }
    })
    .catch(error => res.status(errorStatusCode).send(error))
});

module.exports = router;
