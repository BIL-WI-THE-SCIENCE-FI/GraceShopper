import { Collapse, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { userActions } from '../../store/ActionsCreators';
import { getMoney } from '../../utils';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

//* Show the users profile information
export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const token = window.localStorage.getItem('token');
  const userId = useSelector((state) => state.auth.id);
  const userType = useSelector((state) => state.auth.userType);

  useEffect(() => {
    async function fetchData() {
      //* If a regular user is looking for a specific profile
      //* they are not allowed, so we will onlly show theirs
      const profileId = id && userType === 'admin' ? id : userId;
      await dispatch(userActions.fetchUser(profileId, token));
    }
    fetchData();
  }, []);

  //* Actual user object used to render profile
  const user = useSelector((state) => state.user.user);
  const { username, firstName, lastName, email, phone, orders, imageUrl } =
    user;

  //* Return JSX
  return (
    <div className='user-profile'>
      <div className='user-profile-container'>
        <div className='user-profile-info'>
          <div className='displays'>
            {getDisplayItem('Username', username)}
            {getDisplayItem('First', firstName)}
            {getDisplayItem('Last', lastName)}
            {getDisplayItem('Email', email)}
            {getDisplayItem('Phone', phone)}
            {getDisplayItem('Image', imageUrl)}
          </div>
          <button
            className='zoomable'
            onClick={() => history.push(`/edit/user/${id}`)}
          >
            Edit Profile
          </button>
        </div>
        <div className='user-profile-image'>
          <img src={imageUrl} alt='No Image Found' />
        </div>
        <div className='user-profile-order'>
          <div>
            <SimpleBar className='user-profile-scroll'>
              {getOrders(orders)}
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
}

//* Get the JSX of the orders
function getOrders(orders) {
  //* Order have not loaded yet
  if (!orders) {
    return <></>;
  }
  //* If the user has no orders
  if (orders.length === 0) return <></>;
  //* Get all of the items
  const ordered = orders.reverse();
  return ordered.map((order) => {
    return <OrderItem key={order.id} order={order} />;
  });
}

//* Order item component
function OrderItem(props) {
  const [open, setOpen] = useState(false);
  const { id, status, orderdetails } = props.order;

  return (
    <div className='individual-order-item'>
      <div
        className='order-item-container'
        onClick={() => setOpen(!open)}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        <div className='order-item'>
          {getDisplayItem('Order Id', id)}
          {getDisplayItem('Status', status)}
          {getDisplayItem('Products', orderdetails.length)}
          {getDisplayItem('Order Total', `$${getTotal(props.order)}`)}
        </div>
      </div>
      <Collapse in={open}>
        <div id={`order-${id}`} className='order-collapse'>
          {getOrderDetails(orderdetails)}
        </div>
      </Collapse>
    </div>
  );
}

//* Get the individual order details
function getOrderDetails(orderdetails) {
  //* Order have not loaded yet
  if (!orderdetails || orderdetails.length === 0) {
    return <span>No items in cart yet!</span>;
  }
  //* Get the order details
  return orderdetails.map((orderdetail, index) => {
    return <OrderDetail key={`detail${index}`} orderdetail={orderdetail} />;
  });
}

//* This basically renders a div for each
//* product so that you can see the contents of each order
function OrderDetail(props) {
  const { quantity, price, product } = props.orderdetail;
  const { name, rating, imageUrl } = product;

  return (
    <div className='individual-detail-container'>
      <div className='individual-detail'>
        <img src={imageUrl} alt='loading' />
        <div className='info'>
          {getDisplayItem('Name', name)}
          {getDisplayItem('Rating', rating)}
          {getDisplayItem('Quantity', quantity)}
          {getDisplayItem('Total', `$${getMoney(price)}`)}
        </div>
      </div>
    </div>
  );
}

//* Get the user display items
function getDisplayItem(type, phrase) {
  return (
    <div className='display' key={type}>
      <label>{type + ':'}</label>
      <span>{phrase ? phrase : 'None'}</span>
    </div>
  );
}

//* Get the total value of the cart
function getTotal(order) {
  let total = 0;
  //* If the the cart doesn't exist, nothing to total
  if (order === undefined) return total;
  if (order.orderdetails === undefined) return total;
  if (order.orderdetails.length === 0) return total;
  //* Add all of the product prices
  for (let product of order.orderdetails) total += product.price;
  return getMoney(total);
}
