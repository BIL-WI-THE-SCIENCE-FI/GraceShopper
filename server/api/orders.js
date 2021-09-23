const router = require('express').Router()
const {
  models: { User, Order }
} = require('../db')
const Product = require('../db/models/Product')

const attributes = ['id', 'username', 'firstName', 'lastName', 'userType', 'phone', 'email']

//* ============== POST /API/ORDERS/:USERID =============
//* Update the users order
router.post('/:userId', async (request, response, next) => {
  try {
    //* Get the product id
    const userId = request.params.userId
    //* Find order
    const user = await User.findOne({
      where: { id: userId },
      include: Order,
      attributes: attributes
    })

    //* Get the updated information
    const { productId, quantity } = request.body

    //! Remove
    console.log('--------------------')
    console.log('request.body:', request.body)
    console.log('productId:', productId)
    console.log('quantity:', quantity)
    console.log('--------------------')
    //! Remove

    //* Find the product
    const product = await Product.findOne({ where: { id: productId } })

    const orderInstance = user.orders[0]

    // if (orderInstance === undefined) return

    //* Add to order details
    const orderDetails = await orderInstance.addProduct(product, {
      through: { quantity: 10, price: product.price * 10 }
    })

    //! Remove
    console.log('--------------------')
    console.log('orderInstance:', orderInstance)
    console.log('--------------------')
    console.log('orderDetails:', orderDetails)
    console.log('--------------------')
    //! Remove

    //* Save the user
    await user.save()
    //* Send response
    response.send(orderInstance)
  } catch (error) {
    next(error)
  }
})

//* ============== GET /API/ORDERS/:USERID ==============
router.get('/:userId', async (request, response, next) => {
  try {
    //* Get the product id
    const userId = request.params.userId
    //* Find user
    const user = await User.findOne({
      where: { id: userId },
      include: Order,
      attributes: attributes
    })
    //* Send response
    response.json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
