import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

//* v Import components v
import { LoginPage, Signup } from '../components/Login'
import DeniedEdit from '../components/edit-components/DeniedEdit'
import LoggedOutCart from '../components/cart-checkout/LoggedOutCart'

//* ^ Import components ^

class LoggedOutRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={LoggedOutCart} />
        <Route path="/edit/products/:id" component={DeniedEdit} />
      </Switch>
    )
  }
}

export default withRouter(LoggedOutRoutes)
