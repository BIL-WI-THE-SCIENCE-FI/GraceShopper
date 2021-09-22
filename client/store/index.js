import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
// import productsReducer from './products'
import productsReducer from './reducers/productsReducer'
// import cartReducer from './ActionTypes/cart'
import cartReducer from './reducers/cartReducer'

//* CombineReducers
const reducer = combineReducers({
  auth,
  products: productsReducer,
  cart: cartReducer
})

//* Apply the middleware
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

//* Create the store
const store = createStore(reducer, middleware)

export default store
export * from './auth'
