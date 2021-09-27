import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { orderActions } from '../../store/ActionsCreators'
import { getMoney } from '../../utils'
import CheckoutForm from './CheckoutForm'

//* This component will render when directed to /checkout
//* It will allow a user to checkout
export default function Checkout() {
  const history = useHistory()
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.id)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      //* Fetch the users cart
      await dispatch(orderActions.fetchOrder(userId))
      setLoaded(true)
    }
    fetchData()
  }, [])

  const { order } = useSelector(state => state.order)

  //* If component has loaded
  if (loaded) {
    if (order.orderdetails.length === 0) {
      history.goBack()
      return <></>
    }
    //* Total order price
    const total = getTotal(order)

    return (
      <div className="form_product_edit_container">
        <div>
          <CheckoutForm userId={userId} total={total} />
        </div>
      </div>
    )
  }

  return <></>
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
