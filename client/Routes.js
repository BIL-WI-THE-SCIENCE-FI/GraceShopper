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
    const { isLoggedIn, loaded } = this.props

    //* Check if the user has been authenticated or not first
    if (loaded) {
      return (
        <div>
          <UniversalRoutes />
          {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
        </div>
      )
    } else {
      return (
        <div>
          <UniversalRoutes />
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    loaded: state.auth.loaded
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
