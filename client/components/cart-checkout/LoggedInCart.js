import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'simplebar/dist/simplebar.min.css'
import { orderActions } from '../../store/ActionsCreators'
import { getMoney } from '../../utils'
import OrderDisplay from './OrderDisplay'

//* The cart that will be viewed when a user is logged in
const LoggedInCart = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.id)
  const [update, setUpdate] = useState(true)
  const [removed, setRemoved] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      //* Fetch the users cart
      if (update) {
        await dispatch(orderActions.fetchOrder(userId))
        await setUpdate(false)
      }
    }
    fetchData()
  }, [update])

  const { order } = useSelector(state => state.order)
  const [selected, setSelected] = useState(undefined)
  const total = getTotal(order)

  //* Get the next product detail
  function getProduct(id) {
    if (order && order.orderdetails)
      for (let detail of order.orderdetails) if (detail.productId === id) return detail
  }

  //* quantity of current item
  const quantity = selected === undefined ? 1 : getProduct(selected.id).quantity
  //* get the products
  const products = getProducts(order.orderdetails, setSelected, selected, removed, setRemoved)

  //* Return the jsx
  return (
    <OrderDisplay
      products={products}
      selected={selected}
      setUpdate={setUpdate}
      setSelected={setSelected}
      userId={userId}
      quantity={quantity}
      // handleUpdateQuantity={handleUpdateQuantity}
      setRemoved={setRemoved}
      total={total}
    />
  )
}

//* Get all of the product cards
function getProducts(orderDetails, setSelected, selected, removed, setRemoved) {
  if (orderDetails === undefined || orderDetails.length === 0) {
    return <h2>There is nothing in your cart!</h2>
  }

  //* Map the details (products) in the orderDetails
  const products = orderDetails.map(detail => {
    //* Get all of the information from the detail
    let { price, quantity, product } = detail
    const { id, name, description, imageUrl } = product

    //* If the selected card is undefined,
    //* by default set the first item as selected
    if (selected === undefined && id !== removed) {
      selected = product
      setSelected(product)
      setRemoved(undefined)
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
            <span>{'Qty: ' + quantity}</span>
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

export default LoggedInCart
