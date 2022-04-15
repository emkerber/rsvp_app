// for querying the pendings table

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// search for the name entered on the Landing Page
// and if it's found then send back all of their responses
router.get('/:party/:firstName/:lastName', (req, res) => {
  const queryText = `
    SELECT * FROM "pendings" 
    WHERE party_id = $1
    AND first_name = $2 AND last_name = $3;
  `;

  const rp = req.params;

  pool
    .query(queryText, [rp.party, rp.firstName, rp.lastName])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Failed looking at pending list', queryText, err);
      res.sendStatus(500);
    });
});

// // might use for Admin?
// router.get('/all', (req, res) => {
//   const queryText = `SELECT * FROM "pendings"`;
//   pool
//     .query(queryText, [])
//     .then((result) => res.send(result.rows))
//     .catch((err) => {
//       console.log('Failed to get pending list', err);
//       res.sendStatus(500);
//     });
// });

// when inviteStatus is nope
// and nope user is registering
// save their new user_id
router.put('/register', (req, res) => {
  const queryText = `
    UPDATE "pendings" 
    SET user_id = $1 
    WHERE first_name = $2 AND last_name = $3
    AND party_id = $4;
  `;

  const rb = req.body;

  pool
    .query(queryText, [rb.id, rb.name.firstName, rb.name.lastName, rb.party])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Failure updating pending on register', err);
      res.sendStatus(500);
    });
});

// when inviteStatus is none
// create a new entry in the pendings table
// while saving the user_id that was generated
router.post('/new', (req, res) => {
  const queryText = `
    INSERT INTO "pendings" (party_id, user_id, first_name, last_name)
    VALUES ($1, $2, $3, $4);
  `;

  const rb = req.body;
  
  pool
    .query(queryText, [rb.party, rb.id, rb.name.firstName, rb.name.lastName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Big fail inserting into pending on registration', err);
      res.sendStatus(500);
    });
});

module.exports = router;