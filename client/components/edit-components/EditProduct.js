import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../store/ActionsCreators/';
import { useParams } from 'react-router-dom';
import { getMoney } from '../../utils';

const EditProduct = (props) => {
  const { id } = useParams();

  const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      console.log('Params ID is', id);
      await dispatch(productActions.fetchProduct(id));
    }
    fetchData();
  }, []);

  return (
    <div className='singlePage'>
      <div className='imp'>
        <div>
          <img id='productImage' src={product.imageUrl} />
        </div>
        <div className='productInfo'>
          <div>
            <h1>{product.name}</h1>
            <h2>${getMoney(product.price)} price</h2>
            <label>Quantity</label>
            <select name='Quantity'>
              <option value='1'>0</option>
              <option value='1'>1</option>
            </select>
          </div>
        </div>
      </div>
      <div className='aboutItem'>
        <h1>About this item</h1>
        <div className='desBox'>
          <div className='description'>Description {product.description}</div>
          <div className='description'>Reviews</div>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
