const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.post('/', (req, res) => {
  const name = [req.body.fullName];
  const queryText = `INSERT INTO visits (name, whenithappened) VALUES ($1, CURRENT_TIMESTAMP);`;
  pool
    .query(queryText, name)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log('Error saving visit to database', err);
      res.sendStatus(500);
    })
});

module.exports = router;
