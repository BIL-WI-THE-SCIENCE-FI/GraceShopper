import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

//* v Import components v
import LoggedInCart from '../components/cart-checkout/LoggedInCart'
import Products from '../components/products/Products'
import SinglePageProduct from '../components/products/SinglePageProduct/SinglePageProduct'

//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/products/:id" component={SinglePageProduct} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/checkout" component={LoggedInCart} />
      </Switch>
    )
  }
}

export default withRouter(UniversalRoutes)
