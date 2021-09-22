import React from 'react'

//* This is the product card that will appear on the all products
//* page.
export default function ProductCard(props) {
  //* Obtain the information required thru props
  const { name, description, price, rating, stock, imageUrl } = props.product
  //* Return the component JSX
  return (
    <div className="product-card shadow zoomable-small">
      <div>
        <h3>{name}</h3>
        <img src={imageUrl} alt="Product Image" />
      </div>
      <div className="content">
        <div className="desc">
          <span>{description}</span>
        </div>
        <div className="info">
          <p>{`Price: $${price}`}</p>
          {/* TODO: Render stars for the rating */}
          <p>{`Rating: ${rating}/5`}</p>
          <p>{`Stock: ${stock}`}</p>
        </div>
      </div>
    </div>
  )
}
