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

  return (
    <div>
      <div id="navBar">
        <div id="logoLink" onClick={() => history.push('/home')}>
          <img className="logo" src="/Git Logo.png" />
        </div>
        <div className="oursite">TarGit.com</div>
        <div id="productsLink" onClick={() => history.push('/products')}>
          <div id="categories">View Products</div>
        </div>
        <div id="blank"></div>
        <div id="search">
          <input id="search-input" placeholder="Search Product" />
          <div id="search-label">Search</div>
        </div>
        <div id="loginCart">
          <DropItem
            loggedIn={isLoggedIn}
            admin={loggedInType === 'admin'}
            logoutUser={logoutUser}
          />
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
