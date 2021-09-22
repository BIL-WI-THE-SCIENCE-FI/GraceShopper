import { FETCH_PRODUCT, FETCH_PRODUCTS } from './'

// ------------------ Initial State -----------------------
const initialState = {
  products: [],
  product: {}
}

//==================== REDUCER FUNCTION ====================
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.products }
    case FETCH_PRODUCT:
      return { ...state, product: action.product }
    default:
      return state
  }
}
