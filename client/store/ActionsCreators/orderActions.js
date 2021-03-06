import axios from 'axios';
import { GET_ORDER, GET_ORDERS, UPDATE_HEADER } from '../reducers';

//* ------------------ Actions creators --------------------
//* Set the current order
export const setOrder = (order) => ({
  type: GET_ORDER,
  payload: order,
});

//* Set the current orders
export const setOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders,
});

//* Add a cart object to storage so we can update header
export const updateHeader = (cart) => ({
  type: UPDATE_HEADER,
  payload: cart,
});

//* ------------------ Thunk creators -----------------------
//* Used to fetch the current order
export const fetchOrder = (userId, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/current/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setOrder(data));
    } catch (error) {
      console.log('Failed to fetch current order for user: ' + userId);
      return;
    }
  };
};
//* Used to fetch all previous orders
export const fetchOrders = (userId, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/all/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setOrders(data));
    } catch (error) {
      console.log('Failed to fetch order history for user: ' + userId);
      return;
    }
  };
};
