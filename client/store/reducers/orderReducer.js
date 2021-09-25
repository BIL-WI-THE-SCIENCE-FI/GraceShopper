import { GET_ORDERS, GET_ORDER, UPDATE_HEADER } from '.'

// ------------------ Initial State -----------------------
const initialState = {
  order: {},
  orders: [],
  cart: {}
}

//==================== REDUCER FUNCTION ====================
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return { ...state, order: action.payload }
    case GET_ORDERS:
      return { ...state, orders: action.payload }
    case UPDATE_HEADER:
      return { ...state, cart: action.payload }
    default:
      return state
  }
}
