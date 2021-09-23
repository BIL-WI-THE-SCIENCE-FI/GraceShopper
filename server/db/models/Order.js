const Sequelize = require('sequelize')
const db = require('../db')

/*
 * This is the model for each Cart.
 *
 * Each Order should contain the following.
 *
 * - id
 * - status
 */

const Order = db.define('cart', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  }
})

module.exports = Order
