import React from 'react';
import { Link } from 'react-router-dom';
import { LoginPage } from './Login/LoginPage';

const Header = () => {
  return (
    <div id='navBar'>
      <Link id='logoLink' to='/home'>
        <img className='logo' src='/Git Logo.png' />
      </Link>
      <Link id='productsLink' to='/products'>
        <div id='categories'>Products</div>
      </Link>
      <div id='blank'></div>
      <div id='search'>
        <input id='search-input' placeholder='Search Product' />
        <div id='search-label'>Search</div>
      </div>
      <div id='loginCart'>
        <Link id='loginLink' to='/login'>
          Login
        </Link>
        <div id='cartContainer'>
          <img className='logo' src='/CartLogo.png' />
          <div id='cartLabel'>(0)</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
