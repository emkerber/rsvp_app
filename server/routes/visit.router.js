// when a user visits the app, enters their first and last names, and submits,
// save their name and the time they visited

const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.post('/', (req, res) => {
  const queryText = `INSERT INTO visits (first_name, last_name, when_it_happened) VALUES ($1, $2, CURRENT_TIMESTAMP);`;
  pool
    .query(queryText, [req.body.firstName, req.body.lastName])
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log('Error saving visit to database', err);
      res.sendStatus(500);
    })
});

module.exports = router;
