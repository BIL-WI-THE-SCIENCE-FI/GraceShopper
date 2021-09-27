const router = require('express').Router();
const {
  models: { User, Order, Product, OrderDetails },
} = require('../db');
const { isCorrectUser, isLoggedIn, isAdmin } = require('./theGateKeeper');
module.exports = router;

const attributes = [
  'id',
  'username',
  'firstName',
  'lastName',
  'userType',
  'phone',
  'email',
  'imageUrl',
];

//* ============== GET /API/USERS ==============
router.get('/', async (request, response, next) => {
  try {
    //* Return all users
    const users = await User.findAll({
      include: [
        {
          model: Order,
          include: [
            {
              model: OrderDetails,
              include: Product,
            },
          ],
        },
      ],
      attributes: attributes,
    });
    //* Send response
    response.json(users);
  } catch (err) {
    next(err);
  }
});

//* ============== GET /API/USERS/:USERID ==============
router.get('/:userId', async (request, response, next) => {
  try {
    //* Get the user id
    const userId = request.params.userId;
    //* Find user
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Order,
          include: [
            {
              model: OrderDetails,
              include: Product,
            },
          ],
        },
      ],
      attributes: attributes,
    });
    //* Send response
    response.json(user);
  } catch (err) {
    next(err);
  }
});

//* ============== POST /API/USER/:USERID ==============
//* This will update the user with new information
router.post('/:userid', async (request, response, next) => {
  try {
    //* The user's id
    const userId = request.params.userId;
    //* Get the user using the id
    const user = await User.findOne({ where: { id: userId } });

    //* If we couldn't find user
    if (user === null) {
      response.status(500).send('No user was found!');
      return;
    }
    //* Get the updated info
    const { firstName, lastName, phone, email } = request.body;

    //* Make the proper changes
    user.firstName = firstName ? firstName : user.firstName;
    user.lastName = lastName ? lastName : user.lastName;
    user.phone = phone ? phone : user.phone;
    user.email = email ? email : user.email;

    //* Save the user
    await user.save();
    //* Send new user back
    response.send(user);
  } catch (error) {
    next(error);
  }
});

//* ============== DELETE /API/USER/:USERID ==============
//* Deletes a user from the database
router.delete('/', async (request, response, next) => {
  try {
    //* The user's id
    const userId = request.params.userId;
    //* Find user with that by
    const user = await User.findOne({
      where: { id: userId },
    });
    //* If we couldn't find user
    if (user === null) {
      response.status(500).send('No user was found!');
      return;
    }
    await user.destroy();
    //* Send reponse
    response.send(user);
  } catch (error) {
    //* If there is an error, we pass it on
    next(error);
  }
});
