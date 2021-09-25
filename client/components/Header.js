import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { orderActions } from '../store/ActionsCreators'
import { logout } from '../store'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedInType = useSelector(state => state.auth.userType)
  const isLoggedIn = useSelector(state => state.auth.id)

  //* Current order (cart) to show number of items in cart
  const { order } = useSelector(state => state.order)

  useEffect(() => {
    async function fetchData() {
      //* Fetch the users cart
      if (isLoggedIn) {
        await dispatch(orderActions.fetchOrder(isLoggedIn))
      }
    }
    fetchData()
  }, [])

  const itemsInCart = getTotalItems(order)

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
          <Link id="logoutLink" to="/login" onClick={() => dispatch(logout())}>
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
          <div id="cartLabel">{`(${itemsInCart})`}</div>
        </div>
      </div>
    </div>
  )
}

//* Get the total num of items in the cart
function getTotalItems(order) {
  if (order === undefined || order.orderdetails === undefined) return 0
  return order.orderdetails.length
}

export default Header
