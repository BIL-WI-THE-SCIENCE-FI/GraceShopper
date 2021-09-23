const Sequelize = require('sequelize')
const db = require('../db')

/*
 * This is the model for each Cart.
 *
 * Each Product should contain the following.
 *
 * - id
 * - UserId
 * - items
 */

const Cart = db.define('cart', {
  //^ Cart Name is a string that cannot be null
  items: {
    type: Sequelize.JSON,
    defaultValue: '{}'
  }
})

module.exports = Cart

//* Get items JSON as an object
Cart.prototype.getProductsObj = function () {
  return JSON.parse(this.items)
}

//* Add item to cart
Cart.prototype.updateProduct = function (productId, count) {
  const items = this.getProductsObj()
  this.items = JSON.stringify({ ...items, productId: count })
}

//* Remove item from cart
Cart.prototype.removeProduct = function (productId) {
  const items = this.getProductsObj()
  delete items[productId]
  this.items = JSON.stringify(items)
}
