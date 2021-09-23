import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Products from './components/products/Products';
import Cart from './components/cart-checkout/Cart';
import Home from './components/Home';
import { me } from './store';
import SinglePageProduct from './components/products/SinglePageProduct/SinglePageProduct';
import LoginPage from './components/Login/LoginPage';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path='/products' component={Products} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/checkout' component={Cart} />
        </Switch>
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Home} />
            {/* <Redirect to="/home" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={Signup} />
            <Route path='/products/:id' component={SinglePageProduct} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
