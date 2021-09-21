import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Filter from './Filter'
import { bindActionCreator } from 'redux'
import {fetchProducts} from '../../store/products'

const Products = () => {
  const { products } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const {fetchProducts} = bindActionCreator(fetchProducts, dispatch())
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div>
      <Filter />
    </div>
  )
}

export default Products