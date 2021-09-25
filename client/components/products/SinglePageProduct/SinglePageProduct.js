import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productActions } from '../../../store/ActionsCreators'
import { getMoney, getStars } from '../../../utils'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'

const SinglePageProduct = props => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchData() {
      //* Fetch the product using it's id
      await dispatch(productActions.fetchProduct(id))
    }
    fetchData()
  }, [])

  //* Get the information required to complete this component
  const userId = useSelector(state => state.auth.id)
  const { product } = useSelector(state => state.products)
  const { imageUrl, name, rating, price, stock, description } = product

  return (
    <div className="singlePage">
      <div className="imp">
        <div>
          <img id="productImage" src={imageUrl} />
        </div>
        <div className="productInfo">
          <div>
            <h1>{name}</h1>
            <h2>Cost: ${getMoney(price)}</h2>
            <div>
              <label>Rating: </label>
              {getStars(rating).map(each => each)}
            </div>
            <label>Quantity</label>
            {/* <select name="Quantity">{getOptions(stock)}</select> */}
            <Select
              className="singlepage-quantity"
              defaultValue={{ value: 1, label: 1 }}
              options={getOptions(stock)}
              onChange={event => {
                setQuantity(event.value)
                //! Remove
                console.log('--------------------')
                console.log('event.value:', event.value)
                console.log('--------------------')
                //! Remove
              }}
            />
          </div>
          <div className="addToCart" onClick={() => handleAddToCart(product, quantity, userId)}>
            Add To Cart
          </div>
        </div>
      </div>
      <div className="aboutItem">
        <h1>About this item</h1>
        <div className="desBox">
          <div className="description">Description {description}</div>
          <div className="description">Reviews</div>
        </div>
      </div>
    </div>
  )
}

//* Get the quantity options for the quantity selector
function getOptions(stock) {
  const options = []
  for (let i = 1; i < stock + 1; i++) options.push({ value: i, label: i })
  return options
}

//* If a user clicks add tocart
async function handleAddToCart(product, quantity, userId) {
  //! Remove
  console.log('--------------------')
  console.log('quantity:', quantity)
  console.log('--------------------')
  //! Remove
  //* User is not logged in
  if (userId === undefined) {
    //* User is logged in
  } else {
    try {
      const body = {
        productId: product.id,
        price: product.price,
        quantity: quantity,
        addition: true
      }
      await axios.post(`/api/orders/${userId}`, body)
      return true
    } catch (error) {
      console.log('There was an error whilst attempting to add that item to your cart!')
      return false
    }
  }
}

export default SinglePageProduct
