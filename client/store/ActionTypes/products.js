import axios from 'axios'
import history from '../history'
import { fetchProducts } from './ActionsCreators/productActions'
import { actionTypes } from './ActionTypes'

// ------------------ Initial State -----------------------
const initialState = {
  products: [],
  product: {}
}

//==================== REDUCER FUNCTION ====================
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return { ...state, products: action.products }
    case actionTypes.FETCH_PRODUCT:
      return { ...state, product: action.product }
    default:
      return state
  }
}
