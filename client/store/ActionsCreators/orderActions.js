import axios from 'axios'
import { GET_ORDERS, GET_ORDER } from '../reducers'

// ------------------ Actions creators --------------------
//* Set the current order
export const setOrder = order => ({
  type: GET_ORDER,
  payload: order
})

//* Set the current orders
export const setOrders = orders => ({
  type: GET_ORDERS,
  payload: orders
})

// ------------------ Thunk creators -----------------------
//* Used to fetch the current order
export const fetchOrder = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}`)
      //! Remove
      console.log('--------------------')
      console.log('data:', data)
      console.log('--------------------')
      //! Remove
      dispatch(setOrder(data))
    } catch (error) {
      console.log('Failed to fetch current order for user: ' + userId)
      return
    }
  }
}
//* Used to fetch all previous orders
export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/all/${userId}`)
      //! Remove
      console.log('--------------------')
      console.log('data:', data)
      console.log('--------------------')
      //! Remove
      dispatch(setOrders(data))
    } catch (error) {
      console.log('Failed to fetch order history for user: ' + userId)
      return
    }
  }
}
