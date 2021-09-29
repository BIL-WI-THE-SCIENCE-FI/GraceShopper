import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateHeader } from '../../store/ActionsCreators/orderActions'
import { productActions, orderActions } from '../../store/ActionsCreators'
import { getMoney } from '../../utils'
import OrderDisplay from './OrderDisplay'

//* This component will render when directed to /cart
//* It will show a logged out users cart
export default function LoggedOutCart() {
  const dispatch = useDispatch()

  const [update, setUpdate] = useState(true)
  const [removed, setRemoved] = useState(undefined)
  const [selected, setSelected] = useState(undefined)

  //* Since we will want changes to update the header we
  //* use the cart that is in store
  const { cart } = useSelector(state => state.order)

  //* Get the products from store
  const { products } = useSelector(state => state.products)

  const token = window.localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      if (update) {
        //* load the products from localstorage
        await dispatch(productActions.fetchProducts(token))
        //* Get the localStorage cart
        updateHeader(JSON.parse(localStorage.getItem('cart')))
        await setUpdate(false)
      }
    }
    fetchData()
  }, [update])

  //* Used to update header cart number
  async function updateHeader(cart) {
    await dispatch(orderActions.updateHeader(cart))
  }

  //* quantity of current item
  const quantity = selected ? cart[selected.id] : 1
  //* order total
  const total = getTotal(cart, products)

  //* Return the jsx
  return (
    <OrderDisplay
      products={getProducts(products, cart, selected, setSelected, removed, setRemoved)}
      selected={selected}
      setUpdate={setUpdate}
      setSelected={setSelected}
      userId={undefined}
      quantity={quantity}
      // handleUpdateQuantity={handleUpdateQuantity}
      setRemoved={setRemoved}
      total={total}
      cart={cart}
      updateHeader={updateHeader}
    />
  )
}

//* Get all of the product cards
function getProducts(products, cart, selected, setSelected, removed, setRemoved) {
  if (cart === null || cart === undefined) return <h2>There is nothing in your cart!</h2>
  const productIds = Object.keys(cart)
  //* If there is nothing in the useres cart
  if (productIds.length === 0) return <h2>There is nothing in your cart!</h2>

  const productJsx = products.map(product => {
    if (productIds.includes(product.id.toString())) {
      //* Get all of the information from the product
      const { id, name, price, description, imageUrl } = product
      const quantity = cart[id]

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
              <span>{'Price: $' + getMoney(price * quantity)}</span>
              <span>{'Qty: ' + quantity}</span>
            </div>
          </div>
        </div>
      )
    }
  })

  return productJsx
}

//* Get the total value of the cart
function getTotal(cart, products) {
  let total = 0
  if (cart === null) return total

  if (cart === undefined || products === undefined) return total
  const productIds = Object.keys(cart)
  if (productIds.length === 0 || products.length === 0) return total
  //* Add all of the product prices
  for (let product of products)
    if (productIds.includes(product.id.toString())) total += product.price
  return getMoney(total)
}
