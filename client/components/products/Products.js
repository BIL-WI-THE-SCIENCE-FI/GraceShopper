import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { bindActionCreator } from 'redux';
import { productActions } from '../../store/ActionsCreators';
import ProductCell from './ProductCell';

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // const {fetchProducts} = bindActionCreator(fetchProducts, dispatch())
  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts());
    }
    fetchData();
  }, []);

  return (
    <div className='ProductGrid'>
      {products.length > 0 ? (
        products.map((eachProduct) => (
          <ProductCell key={eachProduct.id} item={eachProduct} />
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Products;
