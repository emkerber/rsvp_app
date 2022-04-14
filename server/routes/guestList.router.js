// for querying the guests table

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// search for the name entered on the Landing Page
// and if it's found then send back all of their responses
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

// when a new user is on the Guest List, 
// after they register,
// update guests table with their user_id
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
// // will likely use for signed-in guests who have provided all responses
// // and also Admin
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

module.exports = router;