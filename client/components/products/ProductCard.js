import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { getMoney, getStars } from '../../utils'

//* This is the product card that will appear on the all products
//* page.
export default function ProductCard(props) {
  const history = useHistory()
  //* Obtain the information required thru props
  const { id, name, description, price, rating, stock, imageUrl } = props.product
  const isLoggedIn = useSelector(state => state.auth.id)
  const userType = useSelector(state => state.auth.userType)
  //* Return the component JSX
  return (
    <div className="product-card shadow zoomable-small">
      <div>
        <div onClick={() => history.push(`/products/${id}`)}>
          <div className="first-half">
            <img src={imageUrl} alt="Product Image" />
            <h4>{name}</h4>
          </div>
          <div className="last-half">
            <div className="content">
              <div className="desc">
                <span>{description}</span>
              </div>
              <div className="info">
                <p>{`Price: $${getMoney(price)}`}</p>
                {/* TODO: Render stars for the rating */}
                <p>{`Rating: ${rating}/5`}</p>
                {/* {getStars(rating)} */}
                <p>{`Stock: ${stock}`}</p>
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn && userType === 'admin' ? (
          <div>
            <button
              className="product-edit-button zoomable"
              onClick={() => history.push(`edit/products/${id}`)}
            >
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
