import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { authenticate } from '../../store';
// import 'simplebar/dist/simplebar.min.css'

const LoginPage = () => {
  const dispatch = useDispatch();
  // const { login, setLogin } = useState('login')
  // const {signup, setSignup} = useState('signup')
  //const {auth} = useSelector(state=>state.auth)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    console.log(formName, username, password)
    dispatch(authenticate(username, password, formName));
  };
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

          <div id='keepSignIn'>
            <input type='checkbox' id='box' name='keep' value='yes' />
            <label htmlFor='keep'> Keep me signed in</label>
          </div>
          <button className='signin' name='button1' >
            sign in
          </button>
        </form>
        <button className='signup' >
          create your account
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
