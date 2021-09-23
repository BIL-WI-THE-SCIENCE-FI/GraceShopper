const router = require('express').Router()
const {
  models: { Order, User }
} = require('../db')
const OrderDetails = require('../db/models/OrderDetails')

//* ============== GET USERS MOST RECENT ORDER =============
async function getOpenOrder(userId) {
  return await Order.findOne({ where: { userId: userId, status: 'pending' } })
}

//* ============== POST /API/ORDERS/:USERID =============
//* Update the users order
router.post('/:userId', async (request, response, next) => {
  try {
    //* Get the product id
    const userId = request.params.userId
    //* Get the order instance
    const orderInstance = await getOpenOrder(userId)
    //* Get the info to update the order
    const { productId, price, quantity } = request.body
    //* Get the order details
    const orderDetails = await OrderDetails.findOne({
      where: { orderId: orderInstance.id, productId: productId }
    })
    //* Update the order details
    orderDetails.price = price * quantity
    orderDetails.quantity = quantity
    //* Save the order details
    await orderDetails.save()
    //* Send response
    response.send(orderInstance)
  } catch (error) {
    next(error)
  }
})

//* ============== GET /API/ORDERS/:USERID ==============
//* Get the users current most recent order
router.get('/:userId', async (request, response, next) => {
  try {
    //* Get the product id
    const userId = request.params.userId
    //* Find user
    let order = await getOpenOrder(userId)

    //* If they do not have an order we will create them an order
    if (order === null) {
      order = await Order.create()
      order.userId = parseInt(userId)
      const user = await User.findOne({ where: { id: userId } })
      await user.addOrder(order)
      await order.save()
    }
    //* Send response
    response.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
