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

router.put('/register', (req, res) => {
  const queryText = `UPDATE "pendings" SET user_id = $1 WHERE full_name = $2;`;
  pool
    .query(queryText, [req.body.id, req.body.name])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Failure updating pending on register', err);
      res.sendStatus(500);
    });
});

router.post('/new', (req, res) => {
  const queryText = `
    INSERT INTO "pendings" (party_id, user_id, first_name, last_name, full_name)
    VALUES ($1, $2, $3, $4, $5);
  `;
  
  const rb = req.body;
  
  pool
    .query(queryText, [rb.party, rb.id, rb.name.firstName, rb.name.lastName, rb.name.fullName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Big fail inserting into pending on registration', err);
      res.sendStatus(500);
    });
});

module.exports = router;