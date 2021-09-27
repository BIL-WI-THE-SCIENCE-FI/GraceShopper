console.log('made it to theGateKeeper')
const User = require('../db/models/User')

const isCorrectUser = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization
    console.log('hello world', authorizedHeader)
    if (!authorizedHeader) {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED'
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const isLoggedIn = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization
    if (!authorizedHeader) {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED'
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const authorizedHeader = req.headers.authorization
    if (!authorizedHeader || (await User.findByToken(authorizedHeader).userType) !== 'admin') {
      return res.status(403).json({
        status: 403,
        message: 'ACCESS DENIED ADMIN PERMISSION REQUIRED'
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { isLoggedIn, isAdmin, isCorrectUser }
// this is to protect against backend unwanted actions
// function to check for admin and logged in

// if admin then next and permission denied response
// function check if save user and logged in
// if saved user then next else permission denied response
