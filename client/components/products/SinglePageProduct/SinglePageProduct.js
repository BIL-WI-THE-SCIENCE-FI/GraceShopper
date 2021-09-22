import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { bindActionCreator } from 'redux';
import { productActions } from '../../store/ActionsCreators';
import ProductCell from './ProductCell';

const SinglePageProduct = () => {
  return <div>SinglePage</div>;
};
export default SinglePageProduct;
