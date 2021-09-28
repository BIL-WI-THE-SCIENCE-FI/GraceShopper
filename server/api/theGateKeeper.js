const User = require('../db/models/User');

function sendResponse(res) {
  return res.status(403).json({
    status: 403,
    message: 'ACCESS DENIED. INVALID USER TOKEN. ADMIN PERMISSION REQUIRED',
  });
}

function checkToken(token) {
  if (!token || token == 'undefined') return true;
  return false;
}

const isCorrectUser = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization;

    //^ Must have sent headers.authorization to the backend
    if (checkToken(authorizedHeader)) return sendResponse(res);
    //* Get the user
    const user = await User.findByToken(authorizedHeader);
    //^ Must be admin or  the correct user for the record to be updated.
    if (user.userType !== 'admin' && user.id != req.params.userId) return sendResponse(res)
    else next()
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization;
    if (checkToken(authorizedHeader)) return sendResponse(res);
    else next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization;
    //* If they have no auth header
    if (checkToken(authorizedHeader)) return sendResponse(res);
    //* If they do, get the user
    const user = await User.findByToken(authorizedHeader);
    //* If they are not an admin
    if (user.userType !== 'admin') return sendResponse(res);
    //* If they are, continue
    else next();
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
