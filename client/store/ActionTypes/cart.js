import axios from 'axios';
import history from '../history';
import { actionTypes } from './ActionTypes';

// ------------------ Initial State -----------------------
const initialState = {
  cart: {},
};

//==================== REDUCER FUNCTION ====================
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CART:
      return { ...state, cart: action.cart };
    default:
      return state;
  }
}
