const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
}

const rejectNonBouncer = (req, res, next) => {
  // check if logged in user is an admin
  if (req.user.access_level >= 1) {
    // okay to do the next thing!
    next();
  } else {
    // nope, blocked
    res.sendStatus(403);
  }
}

const rejectNonAdmin = (req, res, next) => {
  // check if logged in user is an admin
  if (req.user.access_level === 2) {
    // okay to do the next thing!
    next();
  } else {
    // nope, blocked
    res.sendStatus(403);
  }
}

module.exports = { rejectUnauthenticated, rejectNonBouncer, rejectNonAdmin };
