import { FETCH_CART } from '../reducers'

// ------------------ Initial State -----------------------
const initialState = {
  cart: {}
}

//==================== REDUCER FUNCTION ====================
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART:
      return { ...state, cart: action.cart }
    default:
      return state
  }
}
