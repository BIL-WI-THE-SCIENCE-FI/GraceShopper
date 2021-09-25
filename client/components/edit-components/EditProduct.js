import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../store/ActionsCreators';
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
    <div>
      <div id='edit-product-flex'>
        <div className='shadow' id='edit-product-label'>
          Edit Product
        </div>
      </div>
      <div className='singlePage'>
        <div className='imp'>
          <div>
            <img id='productImage' src={product.imageUrl} />
          </div>
          <div className='productInfo'>
            <div>
              <h1>{product.name}</h1>
              <h2>${getMoney(product.price)} price</h2>
              <h3>{product.stock}</h3>
            </div>
          </div>
        </div>
        <div className='aboutItem'>
          <h1>Description</h1>
          <h3>{product.description}</h3>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
