import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../store'
import { orderActions } from '../../store/ActionsCreators'
import DropItem from './dropdown/DropMenu'
import DropMenu from './dropdown/DropMenu'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedInType = useSelector(state => state.auth.userType)
  const isLoggedIn = useSelector(state => state.auth.id)

  //* load order & cart so we can update total items in cart
  const { order, cart } = useSelector(state => state.order)

  useEffect(() => {
    async function fetchData() {
      //* Fetch the users cart
      if (isLoggedIn) await dispatch(orderActions.fetchOrder(isLoggedIn))
    }
    fetchData()
  }, [isLoggedIn])

  //* Calculate the number of products we should be showing
  const itemsInCart = getTotalItems(order, isLoggedIn ? true : false)

  //* Used to logout user
  async function logoutUser() {
    await dispatch(logout())
  }

  //* Search for item
  async function attemptSearch(event) {
    const value = event.target.value
    if (event.key !== 'Enter') return
    if (value.length === 0) history.push(`/products`)
    else history.push(`/products?search=${value}`)
  }

  //* Handle changes in search bar
  async function handleChange(event) {
    const value = event.target.value
    if (value.length === 0) history.push(`/products`)
  }

  return (
    <div className="header">
      <div className="header-navbar">
        <img className="logo" src="/Git Logo.png" onClick={() => history.push('/home')} />
        <div className="oursite">TarGit.com</div>
        <div className="products-link">
          <div className="products" onClick={() => history.push('/products')}>
            View Products
          </div>
        </div>
        <div className="blank"></div>
        <div className="search">
          <input
            className="search-input"
            placeholder="Search Product"
            onKeyDown={event => attemptSearch(event)}
            onChange={event => handleChange(event)}
          />
          <div className="search-label">Search</div>
        </div>
        <div className="blank"></div>
        <div className="extras-container">
          <DropItem
            loggedIn={isLoggedIn}
            admin={loggedInType === 'admin'}
            logoutUser={logoutUser}
          />
          {/* Cart Icon */}
          <div className="cart-container" onClick={() => history.push('/cart')}>
            <div className="logo-cart-container">
              <img className="logo-cart" src="/CartLogo.png" />
            </div>
            <div className="cart-label">{`${itemsInCart}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

//* Get the total num of items in the cart
function getTotalItems(order, loggedIn) {
  if (loggedIn) {
    if (order === undefined || order.orderdetails === undefined) return 0
    return order.orderdetails.length
  } else {
    //* Get the order from localStorage
    const order = JSON.parse(localStorage.getItem('order'))
    //* They have no order as of current
    if (order === null) return 0
    return Object.keys(order).length
  }
}

export default Header
