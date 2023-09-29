// for querying the attendance table, 
// at times joined with the guests or pendings tables
// mostly for bouncer stuff

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonBouncer } = require('../modules/authentication-middleware');

// GET guests not checked in
router.get('/not-here', rejectNonBouncer, (req, res) => {
    const queryText = `
        SELECT
            guests.first_name, guests.last_name, guests.additional_guests, 
            attendance.id AS attendance_id, attendance.* 
        FROM guests 
        FULL OUTER JOIN attendance ON guests.id = attendance.guests_id
        WHERE arrival_time IS NULL;
    `;

    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Failed to SELECT not-here rows for bouncer:', error);
            res.sendStatus(500);
        })
})

// TODO - GET guests checked in
// SELECT attendance.id AS attendance_id, * 
// FROM guests RIGHT JOIN attendance ON guests.id = attendance.guests_id;

// TODO - GET by search by first name
// SELECT attendance.id AS attendance_id, * 
// FROM guests FULL OUTER JOIN attendance ON guests.id = attendance.guests_id
// WHERE first_name ILIKE '% %';

// TODO - POST into attendance when guest is checked in

// TODO - DELETE from attendance to un-check-in guest

// TODO - PUT attendance notes

// TODO - POST into attendance for new person not in guests table

module.exports = router;