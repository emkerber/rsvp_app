const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET the whole guest list
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "guests"`;
  pool
    .query(queryText, [])
    .then((result) => res.send(result.rows)) // should send some data instead!!
    .catch((err) => {
      console.log('Failed to get guest list', err);
      res.sendStatus(500);
    });
});

// // does this work?? am I using it?? not sure about either
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