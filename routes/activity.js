var express = require("express");
var router = express.Router();
const client = require("./../db");

const allActiviteCops =
  " select activity, cop , (select name from activity_user where id = activity_cop.cop) as cop_name from activity_cop;";
const usersNames = "select * from activity_user";
const allTypes = "select * from activity_type";
const allActivities =
  "SELECT sts.name as activity_status, activity.id, typ.name as activity_type, usr.name as approved, activity.date, activity.description FROM activity INNER JOIN activity_status as sts ON activity.status = sts.id INNER JOIN activity_type as typ ON activity.type = typ.id INNER JOIN activity_user as usr ON activity.approved_by = usr.id;";

router.post("/addActivity", async function(req, res) {
  const details = req.body;
  const insertQuery = `INSERT INTO public.activity (type, date, approved_by, status, description) VALUES(${details.type}, '${details.time}', ${details.approve}, 2, '${details.description}')`;
  console.log(insertQuery);
  await client.query(insertQuery);
  client.query(`SELECT MAX(id) FROM activity`).then(result => {
    const currId = result.rows[0];
    Promise.all(
      details.power.map(power => {
        console.log(currId.max);
        client.query(
          `INSERT INTO public.activity_cop (activity, cop) VALUES (${currId.max}, ${power})`
        );
      })
    )
      .then(results => res.send())
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  });
});

router.get("/all", function(req, res) {
  client
    .query(allActivities)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      res.send(error ? error.message : "error");
    });
});

router.get("/types", function(req, res) {
  client
    .query(allTypes)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      res.send(error ? error.message : "error");
    });
});

router.put("/changeStatus", function(req, res) {
  const details = req.body;
  console.log(details);
  client
    .query(
      `UPDATE public.activity SET status = ${details.theStatus} WHERE id = ${details.id}`
    )
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      res.send(error ? error.message : "error");
    });
});

router.get("/cops", function(req, res) {
  client
    .query(allActiviteCops)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      res.send(error ? error.message : "error");
    });
});

router.get("/users", function(req, res) {
  client
    .query(usersNames)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      res.send(error ? error.message : "error");
    });
});

router.post("/all", function(req, res) {});

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource 2");
});

module.exports = router;