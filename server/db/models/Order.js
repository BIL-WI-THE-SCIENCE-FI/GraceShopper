const Sequelize = require('sequelize')
const db = require('../db')
const OrderDetails = require('./OrderDetails')
const Product = require('./Product')
const User = require('./User')

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

Order.getOpenOrder = async userId => {
  return await Order.findOne({
    where: { userId: userId, status: 'pending' },
    include: [
      {
        model: OrderDetails,
        include: Product
      }
    ],
    order: [[OrderDetails, 'productId']]
  })
}

Order.createOrder = async userId => {
  const user = await User.findOne({ where: { id: userId } })
  if (user === null) return null
  const order = await Order.create()
  order.userId = parseInt(userId)
  await user.addOrder(order)
  await order.save()
  return order
}

module.exports = Order
