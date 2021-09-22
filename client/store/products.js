import axios from 'axios';
import history from '../history';
import { fetchProducts } from './ActionsCreators/productActions';
import {actionTypes} from './ActionTypes';

// ------------------ Initial State -----------------------
const initialState = {
  products: [],
};

//==================== REDUCER FUNCTION ====================
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
