// for querying the attendance table, 
// at times joined with the guests or pendings tables
// mostly for bouncer stuff

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonBouncer } = require('../modules/authentication-middleware');

