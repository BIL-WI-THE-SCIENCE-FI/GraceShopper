const router = require('express').Router()
const {
  models: { Order, User, OrderDetails, Product }
} = require('../db')

//* ============== GET USERS MOST RECENT ORDER =============
async function getOpenOrder(userId) {
  return await Order.findOne({
    where: { userId: userId, status: 'pending' },
    // include: [{ model: OrderDetails }, { model: Product }]
    include: [
      {
        model: OrderDetails,
        include: Product
      }
    ]
  })
}

//* ============== POST /API/ORDERS/:USERID =============
//* Update the users order (update a product)
router.post('/:userId', async (request, response, next) => {
  try {
    //* Get the user id
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

//* ============== GET /API/ORDERS/ALL/:USERID ==============
//* Get all of the users orders
router.get('/all/:userId', async (request, response, next) => {
  try {
    //* Get the user id
    const userId = request.params.userId

    //* Find all the users orders
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [
        {
          model: OrderDetails,
          include: Product
        }
      ]
    })
    //* Send response
    response.json(orders)
  } catch (err) {
    next(err)
  }
})

//* ============== GET /API/ORDERS/:USERID ==============
//* Get the users current most recent order
router.get('/current/:userId', async (request, response, next) => {
  try {
    //* Get the user id
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
