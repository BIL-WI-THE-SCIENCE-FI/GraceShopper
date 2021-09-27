const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
const Sequelize = require('sequelize');
const { isCorrectUser, isLoggedIn, isAdmin } = require('./theGateKeeper');

//* ============== GET /API/PRODUCTS/:PRODUCTID ==============
//* Get product by id
router.get(
  '/:productId',
  /* middleware */ async (request, response, next) => {
    try {
      //* Get the product id
      const productId = request.params.productId;
      //* Get the product by Id
      const product = await Product.findOne({
        where: { id: productId },
      });
      //* Send the response
      response.json(product);
    } catch (err) {
      next(err);
    }
  }
);

//* ============== GET /API/PRODUCTS ==============
//* Query should ALWAYS be passed in formatted as the following
router.get('/', async (request, response, next) => {
  try {
    //* Get the products
    const products = await Product.findAll({ order: Sequelize.col('id') });
    //* Send the response
    response.json(products);
    return;
  } catch (err) {
    next(err);
  }
});

//* ============== POST /API/PRODUCTS/:PRODUCTID ==============
//* This will update the product with new information
router.post('/:productId', [isAdmin], async (request, response, next) => {
  try {
    //* The product's id
    const productId = request.params.productId;
    //* Get the product using the id
    const product = await Product.findOne({ where: { id: productId } });

    //* If we couldn't find product
    if (product === null) {
      response.status(500).send('No product was found!');
      return;
    }
    //* Get the updated info
    const { name, description, stock, price, imageUrl } = request.body;

    //* Make the proper changes
    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.stock = stock ? stock : product.stock;
    product.price = price ? price : product.price;
    product.imageUrl = imageUrl ? imageUrl : product.imageUrl;

    //* Save the product
    await product.save();
    //* Send new product back
    response.send(product);
  } catch (error) {
    next(error);
  }
});

//* ============== PUT /API/PRODUCTS/ ==============
//* Create / add an new product to the database
//* Just need to send it an object with the info
//* ex: { name, description, rating, stock, price, imageUrl }
router.put('/', [isAdmin], async (request, response, next) => {
  try {
    //* Create the new product
    const product = Product.build(request.body);
    //* Save the product
    await product.save();
    //* Send reponse
    response.send(product);
  } catch (error) {
    //* If there is an error, we pass it on
    next(error);
  }
});

//* ============== DELETE /API/PRODUCTS/:PRODUCTID ==============
//* Deletes a product from the database
router.delete('/', [isAdmin], async (request, response, next) => {
  try {
    //* The product's id
    const productId = request.params.productId;
    //* Find product with that by
    const product = await Product.findOne({
      where: { id: productId },
    });
    //* If we couldn't find product
    if (product === null) {
      response.status(500).send('No product was found!');
      return;
    }
    await product.destroy();
    //* Send reponse
    response.send(product);
  } catch (error) {
    //* If there is an error, we pass it on
    next(error);
  }
});

module.exports = router;
