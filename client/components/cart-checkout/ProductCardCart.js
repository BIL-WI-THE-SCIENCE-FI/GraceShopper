import React from 'react'
import { useHistory } from 'react-router'
import Select from 'react-select'
import { getMoney, getStars } from '../../utils'

//* This is the product card that will appear on the all products
//* page.
export default function ProductCardCart(props) {
  if (props.product === undefined) return <></>
  const history = useHistory() // TODO click to redir
  const { product, userId, quantity, handleUpdateQuantity, setUpdate, setSelected, setRemoved } =
    props
  //* Obtain the information required thru props
  const { id, name, description, price, rating, stock, imageUrl } = product

  //* Return the component JSX
  return (
    <div className="product-card-cart">
      <div className="card shadow zoomable-small">
        <div
          onClick={() => {
            history.push(`/products/${id}`)
          }}
        >
          <div>
            <img src={imageUrl} alt="Product Image" />
            <h4>{name}</h4>
          </div>
          <div className="content">
            <div className="desc">
              <span>{description}</span>
            </div>
            <div className="info">
              <p>{`Price: $${getMoney(price)}`}</p>
              {getStars(rating)}
              <p>{`Stock: ${stock}`}</p>
            </div>
          </div>
        </div>
        <div className="product-card-cart-controls">
          {getSelect(
            quantity,
            stock,
            product,
            userId,
            setUpdate,
            handleUpdateQuantity,
            setSelected,
            setRemoved
          )}
          <button
            onClick={async () => {
              await handleUpdateQuantity(
                product,
                0,
                userId,
                setUpdate,
                true,
                setSelected,
                setRemoved
              )
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

//* Get the quantity options for the quantity selector
function getOptions(quantity) {
  const options = []
  for (let i = 1; i < quantity + 1; i++) options.push({ value: i, label: i })
  return options
}

//* Get the select menu
function getSelect(
  quantity,
  stock,
  product,
  userId,
  setUpdate,
  handleUpdateQuantity,
  setSelected,
  setRemoved
) {
  return (
    <Select
      className="orderpage-quantity"
      value={{ value: quantity, label: quantity }}
      options={getOptions(stock)}
      onChange={async event => {
        await handleUpdateQuantity(
          product,
          event.value,
          userId,
          setUpdate,
          false,
          setSelected,
          setRemoved
        )
      }}
    />
  )
}
