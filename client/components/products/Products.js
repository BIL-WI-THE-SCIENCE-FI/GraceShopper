import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { productActions } from '../../store/ActionsCreators'
import ProductCard from './ProductCard'

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
  const [query, setQuery] = useState(getQuery())

  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts(query))
    }
    fetchData()
  }, [])

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

  //* =============== SET PAGE ===============
  //* Set the page and get the updated product list
  //* for that page
  async function setPage(pageNum) {
    //* update the query
    const newQuery = { ...query, page: pageNum }
    setQuery(newQuery)
    //* Fetch the new products
    await dispatch(productActions.fetchProducts(newQuery))
    // TODO consider updating the location
  }

  //* =============== SET RATING ===============
  //* Update the number of products to be displayed per page
  async function setLimit(limit) {
    //* update the query
    const newQuery = { ...query, limit: limit }
    setQuery(newQuery)
    //* Fetch the new products
    await dispatch(productActions.fetchProducts(newQuery))
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
    await dispatch(productActions.fetchProducts(newQuery))
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
    await dispatch(productActions.fetchProducts(newQuery))
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
    await dispatch(productActions.fetchProducts(newQuery))
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
    await dispatch(productActions.fetchProducts(newQuery))
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
    await dispatch(productActions.fetchProducts(newQuery))
  }

  return (
    <div className="product-container">
      {products.length > 0 ? (
        products.map(product => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>Loading</p>
      )}
    </div>
  )
}

export default Products
