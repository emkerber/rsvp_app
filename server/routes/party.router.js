// get the id of the party for which folks are RSVPing

// it's assumed that the most recent party saved to the parties table
// is the party for which responses are being collected

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "parties"
    ORDER BY id DESC
    LIMIT 1;
  `;

  pool
    .query(queryText, [])
    .then((result) => res.send(result.rows[0]))
    .catch((err) => {
      console.log('Party query failed:', queryText, err);
      res.sendStatus(500);
    });
});

module.exports = router;