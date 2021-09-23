import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
// import 'simplebar/dist/simplebar.min.css'
import { productActions } from '../../store/ActionsCreators';
import ProductCard from './ProductCard';

const LoginPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h1>Sign into your account</h1>
      </div>
      <input className='email' placeholder='Email or username' />
      <input placeholder='Password' text='password' />
      <div>Keep me signed in</div>
      <div>sign in</div>
      <div>create your account</div>
    </div>
  );
};
export default LoginPage;
