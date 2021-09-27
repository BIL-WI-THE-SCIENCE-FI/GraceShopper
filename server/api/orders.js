const router = require('express').Router()
const {
  models: { Order, User, OrderDetails, Product }
} = require('../db')
const Sequelize = require('sequelize')

//* Create new user
async function createOrder(userId) {
  const user = await User.findOne({ where: { id: userId } })
  if (user === null) return null
  const order = await Order.create()
  order.userId = parseInt(userId)
  await user.addOrder(order)
  await order.save()
  return order
}

//* ============== GET USERS MOST RECENT ORDER =============
async function getOpenOrder(userId) {
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

//* ============== GET /API/UPDATE/:USERID ==============
//* Update the order after checkout
router.get('/update/:userId', async (request, response, next) => {
  try {
    //* Get the user id
    const userId = request.params.userId

    //* Find user
    const order = await getOpenOrder(userId)

    //* If they do not have an order we will return nothing
    if (order === null) {
      //* This should never happen but just to be sure
      response.status(404).send('Error, you have no order to checkout!')
      return
    }

    //* Get all of the order details
    const orderDetails = order.orderdetails

    //* For each item in their cart, update the stock
    for (let orderdetail of orderDetails) {
      const { quantity, product } = orderdetail
      const difference = product.stock - quantity
      //* Make sure they aren't over buying
      if (difference >= 0) {
        product.stock = difference
        await product.save()
      }
    }

    //* Update order status
    order.status = 'complete'
    order.save()

    //* Create new order
    await createOrder(userId)
    //* Send response
    response.json(order)
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
    if (order === null) order = await createOrder(userId)

    //* Send response
    response.json(order)
  } catch (err) {
    next(err)
  }
})

//* ============== POST /API/ORDERS/:USERID =============
//* Update the users order (update a product)
router.post('/:userId', async (request, response, next) => {
  try {
    //* Get the user id
    const userId = request.params.userId
    //* Get the order instance
    const orderInstance = await getOpenOrder(userId)
    //* Get the info to update the order
    const { productId, price, quantity, addition, remove } = request.body

    //* If we need to remove it
    if (remove) {
      const product = await Product.findOne({ where: { id: productId } })
      await orderInstance.removeProduct(product)
    } else {
      //* Get the order details
      const orderDetails = await OrderDetails.findOne({
        where: { orderId: orderInstance.id, productId: productId }
      })

      //* Already has item in cart
      if (orderDetails !== null) {
        //* New quantity we should update details with
        let nquantity = quantity
        //* Should we add to their current number of products
        if (addition) nquantity = orderDetails ? orderDetails.quantity + quantity : quantity

        //* Update the details
        orderDetails.quantity = nquantity
        orderDetails.price = price * nquantity
        //* Save the order details
        await orderDetails.save()
      } else {
        //* Find the product
        const product = await Product.findOne({ where: { id: productId } })
        //* Add it to the order
        await orderInstance.addProduct(product, {
          through: { price: price * quantity, quantity: quantity }
        })
      }
    }

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
      ],
      order: Sequelize.col('id')
    })

    //* Send response
    response.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
