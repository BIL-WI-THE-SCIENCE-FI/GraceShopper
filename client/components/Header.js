import React from 'react';
import { Link } from 'react-router-dom';

const Header = ()=>{
  return (
    <div id='navBar'>
      <div id='logo'>Logo</div>
      <div id='categories'>Categories</div>
      <div id='blank'></div>
      <div id='search'>
        <input id='input' placeholder='Search Product' />
        <div>search</div>
      </div>
      <div id='loginCart'>
        <div>login</div>
        <div>cart</div>
      </div>
    </div>
  );
}

export default Header
