const Sequelize = require('sequelize')
const db = require('../db')

/*
 * This is the model for each Order.
 *
 * Each Order should contain the following.
 *
 * - orderId (userId + productId)
 * - userId
 * - productId
 * - quantity
 * - price
 */

const OrderDetails = db.define('orderdetails', {
  //* Quantity of the product in the order
  quantity: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  //* Price = Quantity * Price of product
  price: {
    type: Sequelize.INTEGER
    // allowNull: false
  }
})

module.exports = OrderDetails
