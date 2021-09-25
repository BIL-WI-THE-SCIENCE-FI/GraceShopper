const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

//// REMOVE BEFORE DEPLOY
const { gateRouter, isLoggedIn, isAdmin } = require('./theGateKeeper');
router.use('/test', isLoggedIn, gateRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
