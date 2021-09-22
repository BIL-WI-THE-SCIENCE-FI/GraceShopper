import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../../store/ActionsCreators';
import { useParams } from 'react-router-dom';

const SinglePageProduct = (props) => {
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
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
            <h2>${product.price} price</h2>
            <p>rating{product.rating}</p>
            <div className='rating'>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <label>Quantity</label>
            <select name='Quantity'>
              <option value='1'>0</option>
              <option value='1'>1</option>
            </select>
          </div>
          <div className='addToCart' onClick={() => console.log('add nothing')}>
            Add To Cart
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
export default SinglePageProduct;
