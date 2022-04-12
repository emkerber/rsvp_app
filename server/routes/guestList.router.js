const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET a guest's responses, if they exist
router.get('/:firstName/:lastName', (req, res) => {
  const queryText = `SELECT * FROM "guests" WHERE first_name = $1 AND last_name = $2;`;
  pool
    .query(queryText, [req.params.firstName, req.params.lastName])
    .then((result) => res.send(result.rows)) // should be one row or no rows
    .catch((err) => {
      console.log('Failed to get guest', queryText, err);
      res.sendStatus(500);
    });
});

// if a new user is on the Guest List, then update guests table with their user_id
router.put('/register', (req, res) => {
  const queryText = `UPDATE "guests" SET user_id = $1 WHERE full_name = $2;`;
  pool
    .query(queryText, [req.body.id, req.body.name])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error updating guests user_id', queryText, err);
      res.sendStatus(500);
    });
});

// // GET the whole guest list
// router.get('/all', (req, res) => {
//   const queryText = `SELECT * FROM "guests"`;
//   pool
//     .query(queryText, [])
//     .then((result) => res.send(result.rows))
//     .catch((err) => {
//       console.log('Failed to get guest list', err);
//       res.sendStatus(500);
//     });
// });

// // does this work?? am I using it?? not sure about either
// // if I do use this, 
// //  TODO name is in req.body, not in params
// router.get('/:name', (req, res) => {
//   const name = req.params.name;
//   const queryText = `SELECT "name" FROM "guests" WHERE "name" = $1;`;
//   pool
//     .query(queryText, [name])
//     .then((result) => res.send(result.rows)) // should send some data instead!!
//     .catch((err) => {
//       console.log('Failed to get guest list', err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;