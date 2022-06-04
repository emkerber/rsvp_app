// for querying the pendings table

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmin } = require('../modules/authentication-middleware');



// search for the name entered on the Landing Page
// and if it's found then send back all of their responses
router.get('/search/:party/:firstName/:lastName', (req, res) => {
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


router.get('/fetch-by-user-id/:id', (req, res) => {
  const queryText = `
    SELECT * FROM "pendings"
    WHERE user_id = $1;
  `;

  pool
    .query(queryText, [req.params.id])
    .then(result => res.send(result.rows[0]))
    .catch(error => {
      console.log('Error fetching pending info by user id:', error);
      res.sendStatus(500);
    });
});


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


// save email of user who's pending or none
router.put('/email', (req, res) => {
  const queryText = `
    UPDATE "pendings" SET email = $1 WHERE id = $2;
  `;

  pool
    .query(queryText, [req.body.email, req.body.idInfo])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error updating pendings email:', err);
      res.sendStatus(500);
    });
});


// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// a guest was banished; insert their info and banishment explanation into pendings
router.post('/admin/banished', rejectNonAdmin, (req, res) => {
  const queryText = `
    INSERT INTO "pendings"
    (user_id, party_id, first_name, last_name, email, resolved, denial_message)
    VALUES ($1, $2, $3, $4, $5, TRUE, $6);
  `;

  // req.body is { guest, explanation }
  const rbg = req.body.guest;
  const queryParams = [rbg.user_id, rbg.party_id, rbg.first_name, rbg.last_name, rbg.email, req.body.explanation];

  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error inserting banished person into pendings:', error);
      res.sendStatus(500);
    });
});


module.exports = router;