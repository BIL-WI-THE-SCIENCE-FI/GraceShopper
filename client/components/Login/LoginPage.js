import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { authenticate } from '../../store';
// import 'simplebar/dist/simplebar.min.css'

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate(username, password, formName));
  };
  return (
    <div className='login'>
      <div className='loginbody'>
        <div>
          <h1>Sign into your account</h1>
        </div>
        <form onSubmit={handleSubmit} name={name}>
          <div className='email'>
            <input
              className='email'
              name='username'
              type='text'
              placeholder='Email or username'
            />
          </div>
          <div className='email'>
            <input
              className='email'
              name='password'
              placeholder='Password'
              type='password'
            />
          </div>

          <div id='keepSignIn'>
            <input type='checkbox' id='box' name='keep' value='yes' />
            <label htmlFor='keep'> Keep me signed in</label>
          </div>
          <div className='signin' onClick={handleSubmit}>
            sign in
          </div>
          <div className='signup'>create your account</div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
