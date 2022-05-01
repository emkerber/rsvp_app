// for querying the duties table

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// fetch a guest's existing responses
router.get('/fetch-by-id/:id', (req, res) => {
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

// save new responses 
// (guest has not previously indicated duty preferences)
router.post('/save', rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "duties"
      (guest_id, setup, cleanup, hydration, photography, none)
    VALUES 
      ($1, $2, $3, $4, $5, $6);
  `;

  const rb = req.body;
  const queryParams = [
    rb.guestId, 
    rb.setupDuty, 
    rb.cleanupDuty, 
    rb.waterDuty, 
    rb.photoDuty, 
    rb.noDuty
  ];

  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error saving new duties:', error);
      res.sendStatus(500);
    });
});

// update duty responses 
// (guest has previously indicated duty preferences)
router.put('/update', rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "duties" 
    SET
      setup = $1,
      cleanup = $2,
      hydration = $3,
      photography = $4,
      none = $5
    WHERE guest_id = $6;
  `;

  const rb = req.body;
  const queryParams = [
    rb.setupDuty, 
    rb.cleanupDuty, 
    rb.waterDuty, 
    rb.photoDuty, 
    rb.noDuty,
    rb.guestId
  ];

  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error updating guest duties:', error);
      res.sendStatus(500);
    });
});

module.exports = router;