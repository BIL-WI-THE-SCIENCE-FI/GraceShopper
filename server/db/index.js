//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const OrderDetails = require('./models/OrderDetails')

//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, { through: OrderDetails })
Product.belongsToMany(Order, { through: OrderDetails })

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderDetails
  }
}
