const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "pending"`;
  pool
    .query(queryText, [])
    .then((result) => res.send(result.rows)) // should send some data instead!!
    .catch((err) => {
      console.log('Failed to get guest list', err);
      res.sendStatus(500);
    });
});

module.exports = router;