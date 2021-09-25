import axios from 'axios'
import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import ProductCardCart from './ProductCardCart'

//* This component will render when directed to /cart
//* It will show a logged out users cart
export default function OrderDisplay(props) {
  const {
    products,
    selected,
    setUpdate,
    setSelected,
    userId,
    quantity,
    // handleUpdateQuantity,
    setRemoved,
    total,
    cart,
    updateHeader
  } = props
  //* Return JSX
  return (
    <div className="currentorder-container">
      <div className="one">
        <SimpleBar className="currentorder-scroll">{products}</SimpleBar>
      </div>
      <div className="two">
        <div className="currentorder-productview">
          <ProductCardCart
            product={selected}
            setUpdate={setUpdate}
            setSelected={setSelected}
            userId={userId}
            quantity={quantity}
            handleUpdateQuantity={handleUpdateQuantity}
            setRemoved={setRemoved}
            cart={cart}
            updateHeader={updateHeader}
          />
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

//* If a user changes quantity
async function handleUpdateQuantity(
  product,
  quantity,
  userId,
  setUpdate,
  remove = false,
  setSelected,
  setRemoved,
  cart = null,
  updateHeader = null
) {
  //* User is not logged in
  if (userId === undefined) {
    try {
      //* They have no order as of current
      if (cart === null) return false

      if (remove) {
        //* update their current cart
        delete cart[product.id]
        localStorage.setItem('order', JSON.stringify(cart))
        await updateHeader(cart)
      } else {
        //* update their current cart
        const order = { ...cart, [product.id]: quantity }
        localStorage.setItem('order', JSON.stringify(order))
        await updateHeader(order)
      }

      //* If there was err
    } catch (error) {
      console.log('There was an error whilst attempting to add that item to your cart!')
      return false
    }
  } else {
    //* User is logged in
    try {
      const body = {
        productId: product.id,
        price: product.price,
        quantity: quantity,
        addition: false,
        remove: remove
      }
      await axios.post(`/api/orders/${userId}`, body)
    } catch (error) {
      console.log('Error attempting to remove that item from cart!')
      console.log(error)
    }
  }
  if (remove) {
    await setRemoved(product.id)
    await setSelected(undefined)
  }
  setUpdate(true)
}
