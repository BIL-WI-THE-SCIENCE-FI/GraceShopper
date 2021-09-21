const router = require('express').Router()
const {
  models: { Product }
} = require('../db')
const Sequelize = require('sequelize')

//* ============== GET /API/PRODUCTS/ ==============
//* Get all products
router.get('/', async (request, response, next) => {
  try {
    //* Get the products
    const products = await Product.findAll()
    //* Send the response
    response.json(products)
  } catch (err) {
    next(err)
  }
})

//* ============== GET /API/PRODUCTS/:PRODUCTID ==============
//* Get product by id
router.get('/:productId', async (request, response, next) => {
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
})

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

    //* If no query was provided send back empty response
    if (query.page === undefined) {
      response.status(201).send('No products found')
      return
    }

    //* Page & limit (items per page)
    // const order = query.order // TODO: Consider doing an order (sort price high low etc)
    const page = parseInt(query.page, 0)
    const limit = parseInt(query.limit, 0)
    const { search, price, stock, rating } = query.filters

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

    //* Get the products back
    const products = Product.findAll({
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

module.exports = router
