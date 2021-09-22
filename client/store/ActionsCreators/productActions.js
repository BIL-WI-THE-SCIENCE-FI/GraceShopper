import axios from 'axios'
import {actionTypes} from '../ActionTypes';


// ------------------ Actions creators --------------------

export const _fetchProducts = (products) => ({
  type: actionTypes.FETCH_PRODUCTS,
  products,
});

// ------------------ Thunk creators -----------------------

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/products');
    dispatch(_fetchProducts(response.data));
  };
};