import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../store'

const Header = () => {
  const loggedInType = useSelector(state => state.auth.userType)
  const isLoggedIn = useSelector(state => state.auth.id)
  const history = useHistory()

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div id="navBar">
      <Link id="logoLink" to="/home">
        <img className="logo" src="/Git Logo.png" />
      </Link>
      <Link id="productsLink" to="/products">
        <div id="categories">Products</div>
      </Link>
      <div id="blank"></div>
      <div id="search">
        <input id="search-input" placeholder="Search Product" />
        <div id="search-label">Search</div>
      </div>
      <div id="loginCart">
        {isLoggedIn ? (
          <Link id="logoutLink" to="/login" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link id="loginLink" to="/login">
            Login
          </Link>
        )}
        <div
          id="cartContainer"
          onClick={() => {
            history.push('/cart')
          }}
        >
          <img className="logo" src="/CartLogo.png" />
          <div id="cartLabel">(0)</div>
        </div>
      </div>
    </div>
  )
}

export default Header
