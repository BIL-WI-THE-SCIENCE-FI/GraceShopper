import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { authenticateSignup } from '../../store';

const Signup = () => {
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const user = {
      email: evt.target.email.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      username: evt.target.username.value,
      password: evt.target.password.value,
    };
    dispatch(authenticateSignup(user, formName));
  };
  return (
    <div className='login'>
      <div className='loginbody'>
        <div>
          <h1>Sign into your account</h1>
        </div>
        <form onSubmit={handleSubmit} name='signup'>
          <div className='emailBox'>
            <input
              className='email'
              name='email'
              type='text'
              placeholder='Email'
            />
          </div>
          <div className='emailBox'>
            <input
              className='email'
              name='firstName'
              type='text'
              placeholder='Frist Name'
            />
          </div>
          <div className='emailBox'>
            <input
              className='email'
              name='lastName'
              placeholder='Last Name'
              type='text'
            />
          </div>
          <div className='emailBox'>
            <input
              className='email'
              name='username'
              type='text'
              placeholder='Username'
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
          <button className='signin' name='button1'>
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
