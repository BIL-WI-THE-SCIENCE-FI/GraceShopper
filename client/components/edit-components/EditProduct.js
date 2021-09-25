import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productActions } from '../../store/ActionsCreators'
import { useParams } from 'react-router-dom'
import { getMoney } from '../../utils'

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  //* Has the component loaded
  const [loaded, setLoaded] = useState(false)
  //* Get the product from state
  const { product } = useSelector(state => state.products)

  useEffect(() => {
    const fetchData = async () => {
      if (!loaded) await dispatch(productActions.fetchProduct(id))
    }
    fetchData()
  }, [product])
  //* State to store product info / changes in
  const [state, setState] = useState({
    name: '',
    description: '',
    stock: 1,
    price: 0,
    imageUrl: ''
  })

  //* Load product into state
  if (!loaded && product.name) {
    setState({ ...product })
    setLoaded(true)
  }
  //* If there are any form errors
  const [error, setError] = useState(undefined)

  return (
    <div className="form_product_edit_container">
      <form id="form_product_edit">
        <span>Edit Product</span>
        <img src={state.imageUrl} alt="No Image Found." />
        {/* <div className="form-input-submit-group"> */}
        <label htmlFor="productName">Product Name</label>
        <div className="product-edit-input">
          <input
            className="form-text-box"
            type="text"
            name="productName"
            value={state.name}
            placeholder="Product Name"
            onChange={event => setState({ ...state, name: event.target.value })}
          />
        </div>
        <label htmlFor="productDesc">Product Description</label>
        <div className="product-edit-input">
          <textarea
            className="form-text-box"
            type="text"
            name="productDesc"
            value={state.description}
            placeholder="Product Description"
            onChange={event => setState({ ...state, description: event.target.value })}
          />
        </div>
        <label htmlFor="stock">Number in Stock</label>
        <div className="product-edit-input">
          <input
            className="form-text-box-small"
            type="number"
            step="1"
            min="1"
            name="stock"
            value={state.stock}
            placeholder="Stock Qty"
            onChange={event => setState({ ...state, stock: event.target.value })}
          />
        </div>
        <label htmlFor="price">Product Price</label>
        <div className="product-edit-input">
          <input
            className="form-text-box-small"
            type="number"
            step="1"
            min="1"
            name="price"
            value={`${getMoney(state.price)}`}
            placeholder="Product Price"
            onChange={event => setState({ ...state, price: event.target.value })}
          />
        </div>
        <label htmlFor="imageUrl">Image Url</label>
        <div className="product-edit-input">
          <input
            className="form-text-box"
            type="text"
            name="imageUrl"
            value={state.imageUrl}
            placeholder="Image URL"
            onChange={event => setState({ ...state, imageUrl: event.target.value })}
          />
        </div>
        <div className="product-edit-input">
          <button className="submit-button">Submit Edit</button>
        </div>
        {/* </div> */}
      </form>
      {error ? <h3 className="error-label">{error}</h3> : null}
    </div>
  )
}
{
  /* <div id='edit-product-flex'>
<div className='shadow' id='edit-product-label'>
  Edit Product
</div>
</div>
<div className='singlePage'>
<div className='imp'>
  <div>
    <img id='productImage' src={product.imageUrl} />
  </div>
  <div className='productInfo'>
    <div>
      <h1>{product.name}</h1>
      <h2>${getMoney(product.price)} price</h2>
      <h3>{product.stock}</h3>
    </div>
  </div>
</div>
<div className='aboutItem'>
  <h1>Description</h1>
  <h3>{product.description}</h3>
</div>
</div> */
}
export default EditProduct
