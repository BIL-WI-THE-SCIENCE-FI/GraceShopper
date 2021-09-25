const router = require('express').Router();
console.log('made it to theGateKeeper');

const isLoggedIn = async (req, res, next) => {
  try {
    console.log('hello world');
    const authorizedHeader = req.headers.authorization;
    console.log('hello world', authorizedHeader);
    if (!authorizedHeader) {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  const authorizedHeader = req.headers.authorization;
  console.log('Hello World');
  if (!authorizedHeader) {
    return res.status(403).json({
      status: 403,
      message: 'ACCESS DENIED',
    });
  } else {
    return;
  }
};

router.use('/', (req, res, next) => {
  console.log('at least this is working');
});

module.exports = { gateRouter: router, isLoggedIn, isAdmin };
// this is to protect against backend unwanted actions
// function to check for admin and logged in

// if admin then next and permission denied response
// function check if save user and logged in
// if saved user then next else permission denied response
