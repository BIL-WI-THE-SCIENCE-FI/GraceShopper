import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import About from '../components/About'
import Home from '../components/Home'
import Products from '../components/products/Products'
import SinglePageProduct from '../components/products/SinglePageProduct/SinglePageProduct'

//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/products/:id" component={SinglePageProduct} />
        <Route exact path="/products" component={Products} />
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}

export default withRouter(UniversalRoutes)
