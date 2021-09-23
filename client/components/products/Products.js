import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { productActions } from '../../store/ActionsCreators'
import ProductCard from './ProductCard'
import PageSelector from './PageSelector'

const defaultQuery = {
  order: 'id',
  page: 1,
  limit: 10,
  filters: {
    search: { isSearch: false, searchTerm: '' },
    price: { isPrice: false, minPrice: 0, maxPrice: 0 },
    stock: { isStock: false, minStock: 0, maxStock: 0 },
    rating: { isRating: false, minRating: 0, maxRating: 0 }
  }
}

const Products = () => {
  const { products } = useSelector(state => state.products)

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [query, setQuery] = useState(getQuery())
  const [currentProducts, setCurrentProducts] = useState(undefined)
  const [productsInView, setProductsInView] = useState([])

  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts())
      const current = await getCurrentProducts()
      if (!arrayEquals(current, currentProducts)) await setCurrentProducts(current)
    }
    fetchData()
  }, [currentProducts])

  //* Get the query to be used based on the current URL
  function getQuery() {
    //* Get the string path
    let queryString = location.search.replace('?', '')
    try {
      //* If the length is 0 return default query
      if (queryString.length === 0) return defaultQuery
      //* Split apart all of the queries
      queryString.split('&').map(x => {
        //* Split the filter
        const pair = x.split('=')
        //* Get the key and value
        const k = pair.shift()
        const v = pair.pop()
        //* If it is a number, add the value as a number
        if (!isNaN(v)) defaultQuery[k] = parseInt(v, 0)
        return x
      })
      return defaultQuery
    } catch (error) {
      return defaultQuery
    }
  }

  //* Check if array is the same
  function arrayEquals(a, b) {
    if (a === undefined || b === undefined) return false
    return JSON.stringify(a) == JSON.stringify(b)
  }

  //* =============== SET PAGE ===============
  //* Set the page and get the updated product list
  //* for that page
  async function setPage(pageNum) {
    //* update the query
    const newQuery = { ...query, page: pageNum }
    setQuery(newQuery)
    //* Fetch the new products
    getCurrentProducts(newQuery)
    history.replace(location.pathname + `?page=${pageNum}&limit=${query.limit}`)
  }

  //* =============== SET RATING ===============
  //* Update the number of products to be displayed per page
  async function setLimit(limit) {
    //* update the query
    const newQuery = { ...query, limit: limit }
    setQuery(newQuery)
    //* Fetch the new products
    // await dispatch(productActions.fetchProducts(newQuery))
    // TODO consider updating the location
  }

  //* =============== SET ORDER ===============
  //* Set the order in which they should be displayed
  //* (low->high) price, id, etc
  async function setOrder(order) {
    //* update the query
    const newQuery = { ...query, order: order }
    setQuery(newQuery)
    //* Fetch the new products
    // await dispatch(productActions.fetchProducts(newQuery))
  }

  //* =============== SET PRICE ===============
  //* Set a price filter to active/inactive
  async function setPriceFilter(boolean, min = 0, max = 0) {
    //* create the new filter Obj
    const price = { isPrice: boolean, minPrice: min, maxPrice: max }
    const filter = { ...query.filters, price: price }
    //* update the query
    const newQuery = { ...query, filter: filter }
    setQuery(newQuery)
    //* Fetch the new products
  }

  //* =============== SET RATING ===============
  //* Set a rating filter to active/inactive
  async function setRatingFilter(boolean, min = 0, max = 0) {
    //* create the new filter Obj
    const rating = { isRating: boolean, minRating: min, maxRating: max }
    const filter = { ...query.filters, rating: rating }
    //* update the query
    const newQuery = { ...query, filter: filter }
    setQuery(newQuery)
    //* Fetch the new products
  }

  //* =============== SET STOCK ===============
  //* Set a stock filter to active/inactive
  async function setStockFilter(boolean, min = 0, max = 0) {
    //* create the new filter Obj
    const stock = { isStock: boolean, minStock: min, maxStock: max }
    const filter = { ...query.filters, stock: stock }
    //* update the query
    const newQuery = { ...query, filter: filter }
    setQuery(newQuery)
    //* Fetch the new products
  }

  //* =============== SET SEARCH ===============
  //* Set a search filter to active/inactive
  async function setSearchFilter(boolean, searchTerm = '') {
    //* create the new filter Obj
    const search = { isSearch: boolean, searchTerm: searchTerm }
    const filter = { ...query.filters, search: search }
    //* update the query
    const newQuery = { ...query, filter: filter }
    setQuery(newQuery)
    //* Fetch the new products
  }

  //* =============== GET CURRENT PRODUCTS  ===============
  //* Get the current products to be viewed based on query
  function getCurrentProducts(newQuery = query) {
    //* Products are undefined return empty array
    if (products === undefined) return []
    //* desctruc the filters
    const { search, price, stock, rating } = newQuery.filters
    //* filter based on the filters
    const curr = products.filter(product => {
      if (search.isSearch && !isCloseMatch(product.name, search.searchTerm)) return false
      if (price.isPrice && !isBetween(product.price, price.minPrice, price.maxPrice)) return false
      if (stock.isStock && !isBetween(product.price, stock.minStock, stock.maxStock)) return false
      if (rating.isRating && !isBetween(product.price, rating.minRating, rating.maxRating))
        return false
      return true
    })

    //* get the page and limit
    const { page, limit } = newQuery
    //* get the page end and begin
    const pageEnd = page * limit
    const pageBegin = limit === -1 ? 1 : pageEnd - limit
    //* Create the array
    const toView = curr.slice(pageBegin, pageEnd)
    setProductsInView(toView)
    return curr
  }

  //* Check to see if the string is a close match
  function isCloseMatch(str, searchTerm) {
    const fmt = str.toLowerCase().replace(' ')
    for (let term of searchTerm.split(' ')) if (fmt.includes(term.toLowerCase())) return true
    return false
  }

  //* Check to see if the number falls between two numbers
  function isBetween(num, min, max) {
    return num >= min && num <= max
  }

  return (
    <div className="product-container">
      <SimpleBar className="product-scroll">
        <div className="products-container">
          {productsInView !== undefined && productsInView.length > 0 ? (
            productsInView.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </SimpleBar>
      <PageSelector
        setPage={setPage}
        query={query}
        currentCount={currentProducts === undefined ? 0 : currentProducts.length}
      />
    </div>
  )
}

export default Products
