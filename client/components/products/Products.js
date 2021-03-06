import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { productActions } from '../../store/ActionsCreators'
import ProductCard from './ProductCard'
import PageSelector from './PageSelector'
import FilterPanel from './productfilter/Filter'

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
    //* fetch data
    async function fetchData() {
      await dispatch(productActions.fetchProducts())
      await updateProducts()
    }

    //* Create a url listener so we can wait or search bar changes
    const unListen = history.listen(async location => {
      if (location.pathname !== '/products') return
      const query = getQuery(location.search)
      await setQuery(query)
      await updateProducts(query)
    })

    fetchData()
    //* Unlisten
    return () => unListen()
  }, [currentProducts])

  //* Update the products in view
  async function updateProducts(newQuery = query) {
    const current = await getCurrentProducts(newQuery)
    if (!arrayEquals(current, currentProducts)) await setCurrentProducts(current)
  }

  //* Get the query to be used based on the current URL
  function getQuery(path = location.search) {
    const copyQuery = Object.assign(defaultQuery)
    //* If the path is empty
    if (path == '') {
      const search = { isSearch: false, searchTerm: '' }
      const filters = { ...copyQuery.filters, search: search }
      const newQuery = { ...copyQuery, filters: filters }
      return newQuery
    }

    //* Get the string path
    let queryString = path.toLowerCase().replace('?', '')
    try {
      //* If the length is 0 return default query
      if (queryString.length === 0) return copyQuery

      //* Split apart all of the queries
      queryString.split('&').map(x => {
        //* Split the filter
        const pair = x.split('=')
        //* Get the key and value
        const k = pair.shift()
        const v = pair.pop()

        //* If it is a number
        if (!isNaN(v) && v != '') copyQuery[k] = parseInt(v, 0)
        else if (k === 'search' && v != '') {
          copyQuery.filters[k].isSearch = true
          copyQuery.filters[k].searchTerm = v
        }
      })
      //* return copy query
      return copyQuery
    } catch (error) {
      return copyQuery
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
    getCurrentProducts(newQuery)
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
    getCurrentProducts(newQuery)
  }

  //* =============== SET PRICE ===============
  //* Set a price filter to active/inactive
  async function setPriceFilter(boolean, min = 0, max = 0) {
    //* create the new filter Obj
    const price = { isPrice: boolean, minPrice: min, maxPrice: max }
    const filter = { ...query.filters, price: price }
    //* update the query
    const newQuery = { ...query, filters: filter }
    setQuery(newQuery)
    //* Fetch the new products
    getCurrentProducts(newQuery)
  }

  //* =============== SET RATING ===============
  //* Set a rating filter to active/inactive
  async function setRatingFilter(boolean, min = 0, max = 0) {
    //* create the new filter Obj
    const rating = { isRating: boolean, minRating: min, maxRating: max }
    const filter = { ...query.filters, rating: rating }
    //* update the query
    const newQuery = { ...query, filters: filter }
    setQuery(newQuery)
    //* Fetch the new products
    getCurrentProducts(newQuery)
  }

  //* =============== SET STOCK ===============
  //* Set a stock filter to active/inactive
  async function setStockFilter(boolean, min = 0, max = 0) {
    //* create the new filter Obj
    const stock = { isStock: boolean, minStock: min, maxStock: max }
    const filter = { ...query.filters, stock: stock }
    //* update the query
    const newQuery = { ...query, filters: filter }
    setQuery(newQuery)
    //* Fetch the new products
    getCurrentProducts(newQuery)
  }

  //* =============== GET CURRENT PRODUCTS  ===============
  //* Get the current products to be viewed based on query
  function getCurrentProducts(newQuery) {
    //* Products are undefined return empty array
    if (products === undefined) return []
    //* desctruc the filters
    const { search, price, stock, rating } = newQuery.filters
    //* filter based on the filters
    const curr = products.filter(product => {
      if (search.isSearch && !isCloseMatch(product.name, search.searchTerm)) return false
      if (price.isPrice && !isBetween(product.price, price.minPrice * 100, price.maxPrice * 100))
        return false
      if (stock.isStock && !isBetween(product.stock, stock.minStock, stock.maxStock)) return false
      if (rating.isRating && !isBetween(product.rating, rating.minRating, rating.maxRating))
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
    return num >= min && (num <= max || max === 0)
  }

  return (
    <div className="product-page">
      <FilterPanel
        query={query}
        setOrder={setOrder}
        setPriceFilter={setPriceFilter}
        setRatingFilter={setRatingFilter}
        setStockFilter={setStockFilter}
        setLimit={setLimit}
      />
      <div className="product-container">
        <SimpleBar className="product-scroll">
          <div className="products-container">
            {productsInView !== undefined && productsInView.length > 0 ? (
              productsInView.map(product => <ProductCard key={product.id} product={product} />)
            ) : query.filters.search.isSearch ? (
              <p>No products were found!</p>
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
    </div>
  )
}

export default Products
