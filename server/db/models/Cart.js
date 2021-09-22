const Sequelize = require('sequelize');
const db = require('../db');

/*
 * This is the model for each Cart.
 *
 * Each Product should contain the following.
 *
 * - id
 * - UserId
 * - items
 */

module.exports = db.define('cart', {
  //^ Cart Name is a string that cannot be null
  items: {
    type: Sequelize.JSON,
    defaultValue: '{}',
  },
});
