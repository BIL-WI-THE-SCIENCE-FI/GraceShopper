const router = require('express').Router()
const {
  models: { Product }
} = require('../db')
const Sequelize = require('sequelize')

//* ============== GET /API/PRODUCTS/:PRODUCTID ==============
//* Get product by id
router.get(
  '/:productId',
  /* middleware */ async (request, response, next) => {
    try {
      //* Get the product id
      const productId = request.params.productId
      //* Get the product by Id
      const product = await Product.findOne({
        where: { id: productId }
      })
      //* Send the response
      response.json(product)
    } catch (err) {
      next(err)
    }
  }
)

//* ============== GET /API/PRODUCTS ==============
//* Query should ALWAYS be passed in formatted as the following
/*
 * query {
 *   order: 'id', (order in which the products should be showed)
 *   page: 1,     (page the user is viewing)
 *   limit: 10,   (items per page)
 *   filters: {
 *     search: { isSearch:true/false,  searchTerm: "air pods" }
 *     price:  { isPrice: true/false,  minPrice: 0, maxPrice: 10 }
 *     stock:  { isStock: true/false,  minStock: 0, maxStock: 10 }
 *     rating: { isRating:true/false,  minRating:0, maxRating:10 }
 *   }
 * }
 */
router.get('/', async (request, response, next) => {
  try {
    //* Get the query
    const query = request.query

    //* If no query was provided send back all products
    if (query === undefined || query.page === undefined) {
      //* Get the products
      const products = await Product.findAll()
      //* Send the response
      response.json(products)
      return
    }

    //* Page & limit (items per page)
    // const order = query.order // TODO: Consider doing an order (sort price high low etc)
    // TODO: Remove all this, it's done front end now
    const page = parseInt(query.page, 0)
    const limit = parseInt(query.limit, 0)
    const { search, price, stock, rating } = JSON.parse(query.filters)

    //* Filter conditions
    const { isSearch, searchTerm } = search
    const { isPrice, minPrice, maxPrice } = price
    const { isStock, minStock, maxStock } = stock
    const { isRating, minRating, maxRating } = rating

    //* Find page start and end
    const pageEnd = page * limit
    const pageBegin = limit === -1 ? 1 : pageEnd - limit

    //* Where conditions
    const whereBy = {}

    //* If the user is looking for a product between a min and max condition
    if (isPrice) whereBy.price = { [Sequelize.Op.between]: [minPrice, maxPrice] }
    if (isStock) whereBy.stock = { [Sequelize.Op.between]: [minStock, maxStock] }
    if (isRating) whereBy.rating = { [Sequelize.Op.between]: [minRating, maxRating] }
    if (isSearch) whereBy.name = { [Sequelize.Op.iLike]: `%${searchTerm}%` }
    //* ^ Consider searching thru desc aswell ^

    //* Get the products back
    const products = await Product.findAll({
      where: whereBy,
      offset: pageBegin,
      limit: limit
    })

    //* Send the response
    response.json(products)
  } catch (err) {
    next(err)
  }
})

//* ============== POST /API/PRODUCTS/:PRODUCTID ==============
//* This will update the product with new information
router.post('/:productid', async (request, response, next) => {
  try {
    //* The product's id
    const productId = request.params.productId
    //* Get the product using the id
    const product = await Product.findOne({ where: { id: productId } })

    //* If we couldn't find product
    if (product === null) {
      response.status(500).send('No product was found!')
      return
    }
    //* Get the updated info
    const { name, description, stock, price, imageUrl } = request.body

    //* Make the proper changes
    product.name = name ? name : product.name
    product.description = description ? description : product.description
    product.stock = stock ? stock : product.stock
    product.price = price ? price : product.price
    product.imageUrl = imageUrl ? imageUrl : product.imageUrl

    //* Save the product
    await product.save()
    //* Send new product back
    response.send(product)
  } catch (error) {
    next(error)
  }
})

//* ============== PUT /API/PRODUCTS/ ==============
//* Create / add an new product to the database
//* Just need to send it an object with the info
//* ex: { name, description, rating, stock, price, imageUrl }
router.put('/', async (request, response, next) => {
  try {
    //* Create the new product
    const product = Product.build(request.body)
    //* Save the product
    await product.save()
    //* Send reponse
    response.send(product)
  } catch (error) {
    //* If there is an error, we pass it on
    next(error)
  }
})

//* ============== DELETE /API/PRODUCTS/:PRODUCTID ==============
//* Deletes a product from the database
router.put('/', async (request, response, next) => {
  try {
    //* The product's id
    const productId = request.params.productId
    //* Find product with that by
    const product = await Product.findOne({
      where: { id: productId }
    })
    //* If we couldn't find product
    if (product === null) {
      response.status(500).send('No product was found!')
      return
    }
    await product.destroy()
    //* Send reponse
    response.send(product)
  } catch (error) {
    //* If there is an error, we pass it on
    next(error)
  }
})

module.exports = router
