import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      {/* {
       isLoggedIn ? ( */}
      <div>
        {/* The navbar will show these links after you log in */}
        <Link to='/home'>Home</Link>
        <a href='#' onClick={handleClick}>
          Logout
        </a>
      </div>
      {/* ) : (
        <div>
        </div>
        )
      } */}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
