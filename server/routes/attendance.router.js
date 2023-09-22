// for querying the attendance table, 
// at times joined with the guests or pendings tables
// mostly for bouncer stuff

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonBouncer } = require('../modules/authentication-middleware');

// TODO - GET guests not checked in
// guests RIGHT (?) INNER JOIN attendance ON guests.id = guests_id

// TODO - GET guests checked in

// TODO - POST into attendance when guest is checked in

// TODO - DELETE from attendance to un-check-in guest

// TODO - PUT attendance notes

// TODO - GET by search term

// TODO - POST into attendance for new person not in guests table