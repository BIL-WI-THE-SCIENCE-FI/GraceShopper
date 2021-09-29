import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import LoggedOutCart from '../components/cart-checkout/LoggedOutCart'
import DeniedEdit from '../components/edit-components/DeniedEdit'
//* v Import components v
import { LoginPage, Signup } from '../components/Login'

//* ^ Import components ^

class LoggedOutRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cart" component={LoggedOutCart} />
        <Route path="/checkout" component={LoginPage} />
        <Route path="/edit/products/:id" component={DeniedEdit} />
      </Switch>
    )
  }
}

export default withRouter(LoggedOutRoutes)
