import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/ActionsCreators';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(cartActions.fetchCart());
    }
    fetchData();
  }, []);

  return (
    <div className='Cart'>
      {cart.items.length > 0 ? (
        cart.map((eachProduct) => (
          <ProductCell key={eachProduct.id} item={eachProduct} />
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Products;
