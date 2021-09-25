import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { orderActions } from '../../store/ActionsCreators'
import { getMoney } from '../../utils'
import ProductCardCart from './ProductCardCart'
import Select from 'react-select'
import axios from 'axios'

//* The cart that will be viewed when a user is logged in
const LoggedInCart = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.id)

  useEffect(() => {
    async function fetchData() {
      //* Fetch the users cart
      await dispatch(orderActions.fetchOrder(userId))
    }
    fetchData()
  }, [])

  const { order } = useSelector(state => state.order)
  const [selected, setSelected] = useState(undefined)
  const total = getTotal(order)

  //* Return the jsx
  return (
    <div className="currentorder-container">
      <div className="one">
        <SimpleBar className="currentorder-scroll">
          {getProducts(order.orderdetails, setSelected, selected, userId)}
        </SimpleBar>
      </div>
      <div className="two">
        <div className="currentorder-productview">
          <ProductCardCart product={selected} />
        </div>
        <div className="currentorder-total">
          <h3>{`Total: $${total}`}</h3>
          <div>
            <button
              onClick={() => {
                console.log('you bougt mail')
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

//* Get all of the product cards
function getProducts(orderDetails, setSelected, selected, userId) {
  if (orderDetails === undefined || orderDetails.length === 0) {
    return <span>There is nothing in your cart!</span>
  }

  //* Map the details (products) in the orderDetails
  const products = orderDetails.map(detail => {
    //* Get all of the information from the detail
    const { price, quantity, product } = detail
    const { id, name, description, imageUrl } = product

    //* If the selected card is undefined,
    //* by default set the first item as selected
    if (selected === undefined) {
      selected = product
      setSelected(product)
    }

    return (
      <div
        key={id}
        className="currentorder-productcard zoomable-small shadow-nohover"
        onClick={() => {
          setSelected(product)
        }}
      >
        <img src={imageUrl} />
        <div className="content">
          <h5>{name}</h5>
          <p>{description}</p>
          <div>
            <span>{'Price: $' + getMoney(price)}</span>
            {/* <span>{'Qty: ' + quantity}</span> */}
            <Select
              className="orderpage-quantity"
              defaultValue={{ value: quantity, label: quantity }}
              options={getOptions(quantity)}
              onChange={event => {
                handleUpdateQuantity(product, event.value, userId)
              }}
            />
          </div>
        </div>
      </div>
    )
  })

  return products
}

//* Get the total value of the cart
function getTotal(order) {
  let total = 0
  //* If the the cart doesn't exist, nothing to total
  if (order === undefined) return total
  if (order.orderdetails === undefined) return total
  if (order.orderdetails.length === 0) return total
  //* Add all of the product prices
  for (let product of order.orderdetails) total += product.price
  return getMoney(total)
}

//* Get the quantity options for the quantity selector
function getOptions(quantity) {
  const options = []
  for (let i = 1; i < quantity + 1; i++) options.push({ value: i, label: i })
  return options
}

//* If a user clicks add tocart
async function handleUpdateQuantity(product, quantity, userId) {
  //* User is not logged in
  if (userId === undefined) {
    //* User is logged in
  } else {
    try {
      const body = {
        productId: product.id,
        price: product.price,
        quantity: quantity,
        addition: false
      }
      await axios.post(`/api/orders/${userId}`, body)
      return true
    } catch (error) {
      console.log('There was an error whilst attempting to add that item to your cart!')
      return false
    }
  }
}

export default LoggedInCart
