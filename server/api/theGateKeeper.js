const User = require('../db/models/User');

const isCorrectUser = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization;
    if (
      //^ Must have sent headers.authorization to the backend
      !authorizedHeader ||
      //^ Must be admin or  the correct user for the record to be updated.
      ((await User.findByToken(authorizedHeader).userType) !== 'admin' ||
        (await User.findByToken(authorizedHeader).userId) !== req.params.id)
    ) {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED. INVALID USER TOKEN. ADMIN PERMISSION REQUIRED',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization;
    if (!authorizedHeader) {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED. YOU MUST BE LOGGED IN.',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization;
    if (
      !authorizedHeader &&
      (await User.findByToken(authorizedHeader).userType) !== 'admin'
    ) {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED ADMIN PERMISSION REQUIRED',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn, isAdmin, isCorrectUser };
// this is to protect against backend unwanted actions
// function to check for admin and logged in

// if admin then next and permission denied response
// function check if save user and logged in
// if saved user then next else permission denied response
