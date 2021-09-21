import axios from 'axios';
import history from '../history';
import { fetchProducts } from './Actions/productActions';
import productAction from './Actions'

// ------------------ Initial State -----------------------
const initialState = {
  products:[]
}

// ------------------ Action types ------------------------
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'




//==================== REDUCER FUNCTION ====================
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}