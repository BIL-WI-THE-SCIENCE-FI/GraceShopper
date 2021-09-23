const Sequelize = require('sequelize')
const db = require('../db')

/*
 * This is the model for each Order.
 *
 * Each Order should contain the following.
 *
 * - id
 * - status
 */

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  }
})

module.exports = Order
