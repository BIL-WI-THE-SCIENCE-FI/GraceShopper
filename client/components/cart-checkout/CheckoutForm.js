import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { updateHeader } from '../../store/ActionsCreators/orderActions'
import { getMoney } from '../../utils'

//* This component will render when directed to /
//* It will
export default function CheckoutForm(props) {
  const history = useHistory()
  const { userId, total } = props
  const [state, setState] = useState({
    name: '',
    cardnumber: '',
    cvv: '',
    date: '',
    shipping: '',
    billing: ''
  })

  //* If there are any form errors
  const [errors, setErrors] = useState([])

  //* Update item in state
  function updateState(target, value) {
    const newState = { ...state, [target]: target === 'price' ? value * 100 : value }
    // setErrors(checkValidity(newState))
    setState(newState)
  }

  //TODO submit
  //* Attempt to submit form
  function attemptSubmit() {
    //* Check for errors using state
    const errors = checkValidity(state)
    setErrors(errors)
    //* If there are errors
    //! if (Object.values(errors).length > 0) return false
    //* Async function to make update request
    async function updateOrder() {
      try {
        //* Make attempt to update
        await axios.get(`/api/orders/update/${userId}`)
        await updateHeader({})
        //* Catch errors
      } catch (error) {
        errors.error = 'Failed to update order'
        return false
      }
    }
    //* Update order
    updateOrder()
    return true
  }

  //* Return JSX
  return (
    <form id="form_product_edit">
      <span>Checkout</span>
      <h4>{`Total $${total}`}</h4>
      <label htmlFor="name">Name</label>
      <div className="product-edit-input">
        <input
          className={`form-text-box${errors.name ? '-error' : ''}`}
          type="text"
          name="name"
          value={state.name}
          placeholder="First & Last"
          onChange={event => updateState('name', event.target.value)}
        />
      </div>
      <label htmlFor="cardnumber">Card Number</label>
      <div className="product-edit-input">
        <input
          className={`form-text-box${errors.cardnumber ? '-error' : ''}`}
          type="text"
          name="cardnumber"
          value={state.cardnumber}
          placeholder="0000-0000-0000-0000"
          onChange={event => updateState('cardnumber', event.target.value)}
        />
      </div>
      <label htmlFor="cardnumber">CVV</label>
      <div className="product-edit-input">
        <input
          className={`form-text-box-small${errors.cvv ? '-error' : ''}`}
          type="text"
          name="cvv"
          value={state.cvv}
          placeholder="0000"
          onChange={event => updateState('cvv', event.target.value)}
        />
      </div>
      <label htmlFor="date">Date</label>
      <div className="product-edit-input">
        <input
          className={`form-text-box-small${errors.date ? '-error' : ''}`}
          type="text"
          name="date"
          value={state.date}
          placeholder="01/01/25"
          onChange={event => updateState('date', event.target.value)}
        />
      </div>
      <label htmlFor="shipping">Shipping</label>
      <div className="product-edit-input">
        <input
          className={`form-text-box${errors.shipping ? '-error' : ''}`}
          type="text"
          name="shipping"
          value={state.shipping}
          placeholder="123 Abc street, greenstown, 77354"
          onChange={event => updateState('shipping', event.target.value)}
        />
      </div>
      <label htmlFor="billing">Billing</label>
      <div className="product-edit-input">
        <input
          className={`form-text-box${errors.billing ? '-error' : ''}`}
          type="text"
          name="billing"
          value={state.billing}
          placeholder="123 Abc street, greenstown, 77354"
          onChange={event => updateState('billing', event.target.value)}
        />
      </div>

      <div className="product-edit-input">
        <button
          className="submit-button"
          onClick={async event => {
            event.preventDefault()
            const pass = await attemptSubmit()
            // TODO: props input of prior url
            if (pass) history.push('/home')
          }}
        >
          Submit
        </button>
        <button
          className="submit-button"
          onClick={event => {
            event.preventDefault()
            // TODO: props input of prior url
            history.push('/cart')
          }}
        >
          Cancel
        </button>
      </div>
      <div className="product-edit-error-container">{getErrorMessages(errors)}</div>
    </form>
  )
}

//* Check validity and get error message
function checkValidity(state) {
  //* destructure state
  const { name, cardnumber, cvv, date, shipping, billing } = state
  const errors = []

  //* Check if name is valid
  if (name.length <= 3) errors.name = 'You must provide a name!'
  else if (name.split(' ').length === 0 || name.split(' ')[1].length === 0)
    errors.name = 'You must provide a first and last name!'
  //* Check if cardnumber is vaild
  if (cardnumber.length < 16) errors.cardnumber = 'You must provide a credit card number!'
  //* Check if cvv is vaild
  if (cvv.length < 3) errors.cvv = 'You must provide a cvv number!'
  //* Check if date is vaild
  if (date.length < 3) errors.date = 'You must provide a card expiration date!'
  //* Check if shipping is vaild
  if (shipping.length < 3) errors.shipping = 'You must provide shipping information!'
  //* Check if billing is vaild
  if (billing.length < 3) errors.billing = 'You must provide billing information!'
  return errors
}

//* get error messages
function getErrorMessages(errors) {
  const errs = Object.values(errors)
  if (errs.length !== 0)
    return errs.map((x, index) => {
      return (
        <span className="zoomable" key={index}>
          {x}
        </span>
      )
    })
  return <></>
}
