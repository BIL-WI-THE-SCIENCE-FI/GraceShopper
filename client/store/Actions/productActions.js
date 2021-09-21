import axios from 'axios'



// ------------------ Actions creators --------------------

export const _fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
});

// ------------------ Thunk creators -----------------------

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/products');
    dispatch(_fetchProducts(response.data));
  };
};