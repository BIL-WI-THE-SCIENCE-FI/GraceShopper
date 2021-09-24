import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { orderActions } from '../../store/ActionsCreators'

//* The cart that will be viewed when a user is logged in
const LoggedInCart = () => {
  const dispatch = useDispatch()

  //* Get the cart from store
  const auth = useSelector(state => state.auth)
  const { order } = useSelector(state => state.order)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    async function fetchData() {
      //auth.id
      await dispatch(orderActions.fetchOrder(2))
    }
    fetchData()
  }, [])

  //* Return the jsx
  return (
    <div className="currentorder-container">
      <div className="one">
        <SimpleBar className="currentorder-scroll">{getProducts(order.orderdetails)}</SimpleBar>
      </div>
      <div className="two">
        <div>
          <h3>Total:</h3>
          <span>{order !== undefined ? 'test' : 'test'}</span>
        </div>
        <div>
          <button onClick={() => {}}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

//TODO: TODO: TODO:

//* You need to fix the grid in .currentorder-container
//* check with nick to see if he needs help on the addProduct/edit button
//* remove the manual id from the cart above, or add fake items to admin!

//* Get all of the product cards
function getProducts(orderDetails) {
  if (orderDetails === undefined || orderDetails.length === 0) {
    return <span>There is nothing in your cart!</span>
  }

  //* Map the details (products) in the orderDetails
  const products = orderDetails.map(detail => {
    //* Get all of the information from the detail
    const { price, quantity, product } = detail
    const { id, name, description, stock, rating, imageUrl } = product
    const productPrice = product.price

    return (
      <div key={id} className="currentorder-productcard">
        <img src={imageUrl} />
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  })

  return products
}

export default LoggedInCart
