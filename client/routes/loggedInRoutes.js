import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

//* v Import components v
import LoggedInCart from '../components/cart-checkout/LoggedInCart'
import EditProduct from '../components/edit-components/EditProduct'
import UserProfile from '../components/edit-components/UserProfile'
import Checkout from '../components/cart-checkout/Checkout'
import Home from '../components/Home'
import { LoginPage, Signup } from '../components/Login'

//* ^ Import components ^

class LoggedInRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={LoggedInCart} />
        <Route path="/edit/products/:id" component={EditProduct} />
        <Route path="/profile/:id" component={UserProfile} />
        <Route path="/profile" component={UserProfile} />
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}

export default withRouter(LoggedInRoutes)
