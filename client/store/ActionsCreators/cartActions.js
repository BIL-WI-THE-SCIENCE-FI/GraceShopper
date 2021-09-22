import axios from 'axios'
import { FETCH_CART } from '../reducers'

// ------------------ Actions creators --------------------

export const _fetchCart = cart => ({
  type: FETCH_CART,
  cart
})

// ------------------ Thunk creators -----------------------

export const fetchCart = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/cart`)
      console.log(response.data)
      dispatch(_fetchCart(response.data))
    } catch (error) {
      console.log('Failed to fetch cart')
      return
    }
  }
}
