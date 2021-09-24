import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoggedInRoutes from './routes/loggedInRoutes'
import LoggedOutRoutes from './routes/loggedOutRoutes'
import UniversalRoutes from './routes/universalRoutes'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        {/* <Switch>
          <Route exact path="/products" component={Products} />
          <Route exact path="/checkout" component={LoggedInCart} />
        </Switch> */}
        {/* <Switch>
            <Route path="/cart/:id" component={LoggedInCart} />
            <Route path="/edit/products/:id" component={EditProduct} />
            <Route path="/home" component={Home} />
          </Switch> */}
        {/*  <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:id" component={SinglePageProduct} />
            <Route path="/edit/products/:id" component={DeniedEdit} />
          </Switch>*/}
        <UniversalRoutes />
        {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
