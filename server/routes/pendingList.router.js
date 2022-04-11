const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:firstName/:lastName', (req, res) => {
  const queryText = `SELECT * FROM "pendings" WHERE first_name = $1 AND last_name = $2;`;
  pool
    .query(queryText, [req.params.firstName, req.params.lastName])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Failed looking at pending list', queryText, err);
      res.sendStatus(500);
    });
});

router.get('/all', (req, res) => {
  const queryText = `SELECT * FROM "pendings"`;
  pool
    .query(queryText, [])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Failed to get pending list', err);
      res.sendStatus(500);
    });
});

module.exports = router;