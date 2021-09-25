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
    handleUpdateQuantity,
    setRemoved,
    total
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
