import React from 'react'
import { Link } from 'react-router-dom'
import { getMoney, getStars } from '../../utils'

//* This is the product card that will appear on the all products
//* page.
export default function ProductCardCart(props) {
  if (props.product === undefined) return <></>
  //* Obtain the information required thru props
  const { id, name, description, price, rating, stock, imageUrl } = props.product
  //* Return the component JSX
  return (
    <Link to={`/products/${id}`} className="product-card-cart ">
      <div className="card shadow zoomable-small">
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
            {/* TODO: Render stars for the rating */}
            {getStars(rating)}
            <p>{`Stock: ${stock}`}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
