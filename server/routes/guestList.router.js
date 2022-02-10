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

router.get('/name/:name', (req, res) => {
  const queryText = `SELECT "name" FROM "guests"`;
  pool
    .query(queryText, [])
    .then((result) => res.send(result.rows)) // should send some data instead!!
    .catch((err) => {
      console.log('Failed to get guest list', err);
      res.sendStatus(500);
    });
});

module.exports = router;