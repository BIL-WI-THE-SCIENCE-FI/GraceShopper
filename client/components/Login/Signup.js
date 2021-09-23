import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { authenticate } from '../../store';

const Signup = () => {
  const dispatch = useDispatch();
  return (
    <div className='login'>
      <div className='loginbody'>
        <div>
          <h1>Sign into your account</h1>
        </div>
        <form onSubmit={handleSubmit} name='login'>
          <div className='emailBox'>
            <input
              className='email'
              name='username'
              type='text'
              placeholder='Email or username'
            />
          </div>
          <div className='emailBox'>
            <input
              className='email'
              name='password'
              placeholder='Password'
              type='password'
            />
          </div>
          <div className='emailBox'>
            <input
              className='email'
              name='username'
              type='text'
              placeholder='Email or username'
            />
          </div>
          <div className='emailBox'>
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
          <button className='signin' name='button1'>
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
