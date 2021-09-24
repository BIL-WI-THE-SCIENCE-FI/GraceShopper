import { GET_ORDERS, GET_ORDER } from '.'

// ------------------ Initial State -----------------------
const initialState = {
  order: {},
  orders: []
}

//==================== REDUCER FUNCTION ====================
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return { ...state, order: action.payload }
    case GET_ORDERS:
      return { ...state, orders: action.payload }
    default:
      return state
  }
}
