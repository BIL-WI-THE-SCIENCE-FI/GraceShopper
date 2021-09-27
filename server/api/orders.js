const router = require('express').Router()
const {
  models: { Order, User, OrderDetails, Product }
} = require('../db')
const Sequelize = require('sequelize')

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
    let order = await getOpenOrder(userId)

    //* If they do not have an order we will return nothing
    if (order === null) {
      response.status(404).send('Error, you have no order to checkout!')
      return
    }

    const orderDetails = order.orderdetails

    for (let orderdetail of orderDetails) {
      const { quantity, product } = orderdetail
      product.stock = product.stock - quantity
      //! Remove
      console.log('--------------------')
      console.log('quantity:', quantity)
      console.log('product.stock:', product.stock)
      console.log('final:', product.stock - quantity)
      console.log('--------------------')
      //! Remove
      // await product.save()
    }

    order.status = 'complete'

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

    //! Remove
    console.log('-------[order details updated]-------')
    console.log('productId:', productId)
    console.log('price:', price)
    console.log('quantity:', quantity)
    console.log('addition:', addition)
    console.log('remove:', remove)
    console.log('---------------------------')
    //! Remove

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
