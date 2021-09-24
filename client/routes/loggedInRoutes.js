import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

//* v Import components v
import LoggedInCart from '../components/cart-checkout/LoggedInCart'
import EditProduct from '../components/edit-components/EditProduct'
import Home from '../components/Home'

//* ^ Import components ^

class LoggedInRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/cart/:id" component={LoggedInCart} />
        <Route path="/edit/products/:id" component={EditProduct} />
        <Route path="/home" component={Home} />
      </Switch>
    )
  }
}

export default withRouter(LoggedInRoutes)
