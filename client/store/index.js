import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import productsReducer from './reducers/productsReducer'
import orderReducer from './reducers/orderReducer'
import userReducer from './reducers/userReducer'

//* CombineReducers
const reducer = combineReducers({
  auth,
  products: productsReducer,
  order: orderReducer,
  user: userReducer
})

//* Apply the middleware
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

//* Create the store
const store = createStore(reducer, middleware)

export default store
export * from './auth'
