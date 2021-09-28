import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import ProductCardCart from './ProductCardCart'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//* This component will render when directed to /cart
//* It will show a logged out users cart
export default function OrderDisplay(props) {
  const history = useHistory()
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

  async function clickCheckout() {
    if (userId) {
      if (products === undefined || products.length === 0) {
        toast.error('You have nothing in your cart!')
        return
      }
      history.push('/checkout')
      return
    }
    history.push('/login')
    toast.error('You must log in to check out!')
  }

  //* Return JSX
  return (
    <div className="currentorder-container">
      <div className="one">
        <SimpleBar className="currentorder-scroll">
          {products ? products : <h2>There is nothing in your cart!</h2>}
        </SimpleBar>
      </div>
      <div className="two">
        <div className="currentorder-productview">
          <ProductCardCart
            product={products ? selected : undefined}
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
            <button onClick={() => clickCheckout()}>Checkout</button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      const token = await window.localStorage.getItem('token')
      await axios.post(`/api/orders/${userId}`, body, {
        headers: {
          authorization: token
        }
      })
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
