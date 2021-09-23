const router = require('express').Router()
const {
  models: { User, Cart }
} = require('../db')
module.exports = router

const attributes = ['id', 'username', 'firstName', 'lastName', 'userType', 'phone', 'email']

//* ============== GET /API/USERS ==============
router.get('/', async (request, response, next) => {
  try {
    //* Return all users
    const users = await User.findAll({
      include: Cart,
      attributes: attributes
    })
    //* Send response
    response.json(users)
  } catch (err) {
    next(err)
  }
})

//* ============== GET /API/USERS/:USERID ==============
router.get('/:userId', async (request, response, next) => {
  try {
    //* Get the product id
    const userId = request.params.userId
    //* Find user
    const user = await User.findOne({
      where: { id: userId },
      include: Cart,
      attributes: attributes
    })
    //* Send response
    response.json(user)
  } catch (err) {
    next(err)
  }
})
