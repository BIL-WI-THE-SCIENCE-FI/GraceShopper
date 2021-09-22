import axios from 'axios'
import { FETCH_PRODUCTS, FETCH_PRODUCT } from '../reducers'

// ------------------ Actions creators --------------------

export const _fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

export const _fetchProduct = product => ({
  type: FETCH_PRODUCT,
  product
})

// ------------------ Thunk creators -----------------------

export const fetchProducts = (query = undefined) => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products', { params: query })
      dispatch(_fetchProducts(response.data))
    } catch (error) {
      console.log('Failed to fetch all products')
      return
    }
  }
}

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${productId}`)
      dispatch(_fetchProduct(response.data))
    } catch (error) {
      console.log('Failed to fetch single product')
      return
    }
  }
}
