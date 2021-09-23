const Sequelize = require('sequelize')
const db = require('../db')

/*
 * This is the model for each Product.
 *
 * Each Product should contain the following.
 *
 * - name
 * - description
 * - price
 * - rating
 * - imageUrl
 *
 */

const Product = db.define('product', {
  //* Product Name is a string that cannot be null
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //* Descrption is a large text that cannot be null
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  //* Price is the amount of pennies that the product costs
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  //* Stock is the current number of products in inventory
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  //* Rating is a double that can be between 0 and 5
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min: 0.0,
      max: 5.0
    }
  },
  //* ImageUrl is the url to the image, cannot be null
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
