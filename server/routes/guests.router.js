// for querying the guests table

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');


// search for the name entered on the Landing Page
// and if it's found then send back all of their responses
router.get('/search/:party/:firstName/:lastName', (req, res) => {
  const queryText = `
    SELECT * FROM "guests" 
    WHERE party_id = $1 
    AND first_name = $2 AND last_name = $3;
  `;

  const rp = req.params;

  pool
    .query(queryText, [rp.party, rp.firstName, rp.lastName])
    .then((result) => res.send(result.rows)) // will be one row or no rows
    .catch((err) => {
      console.log('Failed to get guest', err);
      res.sendStatus(500);
    });
});


// fetch guest's responses
router.get('/fetch-by-id/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "guests"
    WHERE id = $1;
  `;
  pool
    .query(queryText, [req.params.id])
    .then(result => res.send(result.rows[0]))
    .catch(err => {
      console.log('Failed to get guest by id', err);
      res.sendStatus(500);
    });
});


// GET list of guests who are attending (first name and last initial)
// visible by signed-in guests who have provided all responses
router.get('/guests-list', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT CONCAT(first_name, ' ', SUBSTRING(last_name, 1, 1), '.') AS guest
    FROM "guests"
    WHERE attending
    ORDER BY first_name;
  `;

  pool
    .query(queryText, [])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Failed to get guests list', err);
      res.sendStatus(500);
    });
});


// when a new user is on the Guest List, 
// after they register,
// update guests table with their user_id
router.put('/register', (req, res) => {
  const queryText = `
    UPDATE "guests" 
    SET user_id = $1 
    WHERE first_name = $2 AND last_name = $3
    AND party_id = $4;
  `;

  const rb = req.body;

  pool
    .query(queryText, [rb.id, rb.name.firstName, rb.name.lastName, rb.party])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error updating guests user_id', queryText, err);
      res.sendStatus(500);
    });
});


// when RSVP form is submitted and attendingResponse is YAY
router.put('/update-responses/YAY', rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "guests"
    SET attending = true,
      attending_code = 'YAY',
      attending_deets = 'NA',
      dietary_restrictions = $1,
      additional_guests = $2,
      parking = $3,
      duties_indicated = $4,
      questions_comments = $5,
      email = $6
    WHERE id = $7;
  `;

  let queryParams = [];
  const rb = req.body;
  queryParams[0] = rb.dietRestrictions;
  queryParams[1] = rb.additionalGuests;
  queryParams[2] = rb.parking;
  queryParams[3] = rb.setupDuty || rb.cleanupDuty || rb.waterDuty || rb.photoDuty || rb.noDuty;
  queryParams[4] = rb.questionsComments;
  queryParams[5] = rb.email;
  queryParams[6] = rb.guestId;

  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating guest responses:', error);
      res.sendStatus(500);
    });
});


// when RSVP form is submitted and attendingResponse is TBD
router.put('/update-responses/TBD', rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "guests" 
    SET attending = false, 
      attending_code = 'TBD', 
      attending_deets = $1
    WHERE id = $2;
  `;

  const rb = req.body;

  pool
    .query(queryText, [rb.attendingDeets, rb.guestId])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating responses - TBD:', error);
      res.sendStatus(500);
    });
});


// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// fetch guests who are attending
router.get('/admin/attending', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT * FROM "guests"
    WHERE attending
    ORDER BY first_name;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error getting list of attending:', error);
      res.sendStatus(500);
    });
});


// fetch guests who indicated they are maybe attending
router.get('/admin/maybe', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT * FROM "guests"
    WHERE attending_code = 'TBD'
    ORDER BY first_name;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error getting list of maybes:', error);
      res.sendStatus(500);
    });
});


// fetch guests who have indicated they will not attend
router.get('/admin/not-attending', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT * FROM "guests"
    WHERE attending_code = 'NAY'
    ORDER BY first_name;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error getting list of those not attending:', error);
      res.sendStatus(500);
    });
});


// fetch guests who have not yet RSVPd
router.get('/admin/no-response', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT * FROM "guests"
    WHERE attending_code IS NULL
    ORDER BY first_name;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error getting guests who have not responded:', error);
      res.sendStatus(500);
    });
});


// fetch details for a guest
router.get('/admin/details/:id', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT * FROM "guests"
    WHERE id = $1;
  `;

  pool
    .query(queryText, [req.params.id])
    .then(result => res.send(result.rows[0]))
    .catch(error => {
      console.log('Error fetching details for a guest:', error);
      res.sendStatus(500);
    });
});


// guest is banished
router.delete('/admin/banish/:id', rejectNonAdmin, (req, res) => {
  const queryText = `
    DELETE FROM "guests"
    WHERE id = $1;
  `;

  pool
    .query(queryText, [req.params.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error deleting from guests:', error);
      res.sendStatus(500);
    });
});


// fetch list of guests who indicated they have dietary restrictions
router.get('/admin/dietary-restrictions', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT id, first_name, last_name, dietary_restrictions AS details
    FROM guests
    WHERE dietary_restrictions NOT IN ('', 'NA')
      AND dietary_restrictions IS NOT NULL
    ORDER BY id;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error selecting list of dietary restrictions:', error);
      res.sendStatus(500);
    });
});


// fetch list of guests who indicated they plan to park during the party
router.get('/admin/parking-during', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT id, first_name, last_name, '' AS details
    FROM guests
    WHERE parking = 'during'
    ORDER BY id;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error selecting list of guests parking during party:', error);
      res.sendStatus(500);
    });
});


// fetch list of guests who indicated they plan to park overnight
router.get('/admin/parking-overnight', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT id, first_name, last_name, '' AS details
    FROM guests
    WHERE parking = 'overnight'
    ORDER BY id;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error selecting list of guests parking overnight:', error);
      res.sendStatus(500);
    });
});


// fetch list of guests who indicated they plan to bring additional guests
router.get('/admin/additional-guests', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT id, first_name, last_name, additional_guests AS details
    FROM guests
    WHERE additional_guests NOT IN ('', 'NA')
      AND additional_guests IS NOT NULL
    ORDER BY id;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error selecting list of guests bringing additional guests:', error);
      res.sendStatus(500);
    });
});


// fetch list of guests who noted questions, comments, concerns, or compliments
router.get('/admin/questions-comments', rejectNonAdmin, (req, res) => {
  const queryText = `
    SELECT id, first_name, last_name, questions_comments AS details
    FROM guests
    WHERE questions_comments <> ''
      AND questions_comments IS NOT NULL
    ORDER BY id;
  `;

  pool
    .query(queryText, [])
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('Error selecting list of guests with questions or comments:', error);
      res.sendStatus(500);
    });
});


module.exports = router;