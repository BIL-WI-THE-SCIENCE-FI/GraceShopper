//* This is the product card that will appear on the all products
//* page.
export default function ProductCard(props) {
  //* Obtain the information required thru props
  const { id, name, description, price, rating, stock, imageUrl } = props.product
  //* Return the component JSX
  return (
    <div classname="product-card" key={id}>
      <div>
        <h3>{name}</h3>
        <img src={imageUrl} alt="Product Image" />
      </div>
      <div>
        <span>{description}</span>
        <p>{`$${price}`}</p>
        {/* TODO: Render stars for the rating */}
        <p>{`${rating}/5`}</p>
        <div>{stock}</div>
      </div>
    </div>
  )
}
