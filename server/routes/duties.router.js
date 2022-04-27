// for querying the duties table

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// fetch a guest's existing responses
router.get('/fetch-by-id/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "duties"
    WHERE guest_id = $1;
  `;

  pool
    .query(queryText, [req.params.id])
    .then(result => {
      if (result.rows.length  > 0) {
        res.send(result.rows[0]);
      } else {
        res.sendStatus(204); // No Content
      }
    })
    .catch(error => {
      console.log('Error GETting duties by id:', error);
      res.sendStatus(500);
    });
});



module.exports = router;