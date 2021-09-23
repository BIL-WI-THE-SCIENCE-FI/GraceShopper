import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productActions } from '../../../store/ActionsCreators'
import { getMoney } from '../../../utils'
import { useParams } from 'react-router-dom'

const SinglePageProduct = props => {
  const { id } = useParams()
  const { product } = useSelector(state => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProduct(id))
    }
    fetchData()
  }, [])

  function getStars(rating) {
    // Round to nearest half
    let output = new Array(5)
    for (let i = 0; i < 5; i++) {
      output[i] = <span key={i}>☆</span>
    }
    for (let i = 0; i < rating; i++)
      output[i] = (
        <span key={i} className="stars">
          ★
        </span>
      )
    return output
  }
  return (
    <div className="singlePage">
      <div className="imp">
        <div>
          <img id="productImage" src={product.imageUrl} />
        </div>
        <div className="productInfo">
          <div>
            <h1>{product.name}</h1>
            <h2>${getMoney(product.price)} price</h2>
            <div>
              <label>Rating: </label>
              {getStars(product.rating).map(each => each)}
            </div>
            <label>Quantity</label>
            <select name="Quantity">
              <option value="1">0</option>
              <option value="1">1</option>
            </select>
          </div>
          <div className="addToCart" onClick={() => console.log('add nothing')}>
            Add To Cart
          </div>
        </div>
      </div>
      <div className="aboutItem">
        <h1>About this item</h1>
        <div className="desBox">
          <div className="description">Description {product.description}</div>
          <div className="description">Reviews</div>
        </div>
      </div>
    </div>
  )
}
export default SinglePageProduct
