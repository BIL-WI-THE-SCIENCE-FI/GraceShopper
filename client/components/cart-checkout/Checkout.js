import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../../store/ActionsCreators'
import { getMoney } from '../../utils'
import CheckoutForm from './CheckoutForm'

//* This component will render when directed to /checkout
//* It will allow a user to checkout
export default function Checkout() {
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
  //* Total order price
  const total = getTotal(order)

  //* Return JSX
  return (
    <div className="form_product_edit_container">
      <CheckoutForm userId={userId} />
    </div>
  )
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
