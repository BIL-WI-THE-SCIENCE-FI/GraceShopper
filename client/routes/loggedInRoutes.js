import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

//* v Import components v
import LoggedInCart from '../components/cart-checkout/LoggedInCart';
import EditProduct from '../components/edit-components/EditProduct';
import { LoginPage, Signup } from '../components/Login';

//* ^ Import components ^

class LoggedInRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={Signup} />
        <Route path='/cart' component={LoggedInCart} />
        <Route path='/edit/products/:id' component={EditProduct} />
      </Switch>
    );
  }
}

export default withRouter(LoggedInRoutes);
