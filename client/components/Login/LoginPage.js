import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { authenticate } from '../../store';
import { orderActions } from '../../store/ActionsCreators';
// import 'simplebar/dist/simplebar.min.css'

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.id);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    await dispatch(authenticate(username, password, formName));
  };

  return (
    <div className='login'>
      {isLoggedIn ? (
        <Redirect to='/home' />
      ) : (
        <div className='loginbody'>
          <div>
            <h1>Sign into your account</h1>
          </div>
          <form className='form' onSubmit={handleSubmit} name='login'>
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
              <button className='signin' name='button1'>
                sign in
              </button>
            </div>
          </form>
          <Link to='/signup'>
            <button className='signup'>Create your account</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
