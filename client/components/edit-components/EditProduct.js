import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { productActions } from '../../store/ActionsCreators';
import { getMoney } from '../../utils';

const EditProduct = () => {
  const token = window.localStorage.getItem('token');
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  //* Has the component loaded
  const [loaded, setLoaded] = useState(false);
  //* Get the product from state
  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      if (!loaded) await dispatch(productActions.fetchProduct(id));
    };
    fetchData();
  }, [product]);
  //* State to store product info / changes in
  const [state, setState] = useState({
    name: '',
    description: '',
    stock: 1,
    price: 0,
    imageUrl: '',
  });

  //* Load product into state
  if (!loaded && product.name) {
    setState({ ...product });
    setLoaded(true);
  }

  //* If there are any form errors
  const [errors, setErrors] = useState([]);

  //* Attempt to submit form
  function attemptSubmit() {
    //* Check for errors using state
    const errors = checkValidity(state, product);
    setErrors(errors);
    //* If there are errors
    if (Object.values(errors).length > 0) return false;
    //* Async function to make update request
    //^ Make initial check before request to see if Token even exists
    console.log(token);
    async function updateProduct() {
      try {
        //* Make attempt to update
        //^ Send token from local storage for analysis
        await axios.post(`/api/products/${product.id}`, state, {
          headers: {
            authorization: token,
          },
        });
        //* Catch errors
      } catch (error) {
        errors.error = 'Failed to update product';
        return false;
      }
    }

    //* Update product
    updateProduct();
    return true;
  }

  //* Update item in state
  function updateState(target, value) {
    const newState = {
      ...state,
      [target]: target === 'price' ? value * 100 : value,
    };
    setErrors(checkValidity(newState, product));
    setState(newState);
  }

  return (
    <div className='form_product_edit_container'>
      <form id='form_product_edit'>
        <span>Edit Product</span>
        <img src={state.imageUrl} alt='No Image Found.' />
        <label htmlFor='productName'>Product Name</label>
        <div className='product-edit-input'>
          <input
            className={`form-text-box${errors.name ? '-error' : ''}`}
            type='text'
            name='productName'
            value={state.name}
            placeholder='Product Name'
            onChange={(event) => updateState('name', event.target.value)}
          />
        </div>
        <label htmlFor='productDesc'>Product Description</label>
        <div className='product-edit-input'>
          <textarea
            className={`form-text-box${errors.description ? '-error' : ''}`}
            type='text'
            name='productDesc'
            value={state.description}
            placeholder='Product Description'
            onChange={(event) => updateState('description', event.target.value)}
          />
        </div>
        <label htmlFor='price'>Product Price</label>
        <div className='product-edit-input'>
          <input
            className={`form-text-box-small${errors.price ? '-error' : ''}`}
            type='number'
            step='1'
            min='1'
            name='price'
            value={getMoney(state.price)}
            placeholder='Product Price'
            onChange={(event) => updateState('price', event.target.value)}
          />
        </div>
        <label htmlFor='stock'>Number in Stock</label>
        <div className='product-edit-input'>
          <input
            className={`form-text-box-small${errors.stock ? '-error' : ''}`}
            type='number'
            step='1'
            min='1'
            name='stock'
            value={state.stock}
            placeholder='Stock Qty'
            onChange={(event) => updateState('stock', event.target.value)}
          />
        </div>
        <label htmlFor='imageUrl'>Image Url</label>
        <div className='product-edit-input'>
          <input
            className={`form-text-box${errors.imageUrl ? '-error' : ''}`}
            type='text'
            name='imageUrl'
            value={state.imageUrl}
            placeholder='Image URL'
            onChange={(event) => updateState('imageUrl', event.target.value)}
          />
        </div>
        <div className='product-edit-input'>
          <button
            className='submit-button'
            onClick={async (event) => {
              event.preventDefault();
              const pass = await attemptSubmit();
              // TODO: props input of prior url
              if (pass) history.push('/home');
            }}
          >
            Submit
          </button>
          <button
            className='submit-button'
            onClick={(event) => {
              event.preventDefault();
              // TODO: props input of prior url
              history.push('/home');
            }}
          >
            Cancel
          </button>
        </div>
        <div className='product-edit-error-container'>
          {getErrorMessages(errors)}
        </div>
      </form>
    </div>
  );
};

//* Check validity and get error message
function checkValidity(state, product) {
  //* destructure state
  const { name, description, stock, price, imageUrl } = state;
  const errors = [];

  //* Check if nothing has changed
  if (JSON.stringify(state) === JSON.stringify(product))
    errors.same = 'You must change something, or cancel!';
  //* Check if name is valid
  if (name.length <= 0) errors.name = 'You must provide a product name!';
  //* Check if description is vaild
  if (description.length <= 0)
    errors.description = 'You must provide a product description!';
  //* Check if stock is valid
  if (isNaN(stock)) errors.stock = 'Stock input must be a number!';
  else if (parseInt(stock) <= 0) errors.stock = 'Stock cannot be zero!';
  //* Check if price is valid
  if (isNaN(price)) errors.price = 'Price input must be a number!';
  else if (parseInt(price) <= 0) errors.price = 'Price cannot be zero!';
  //* Check if imageUrl is valid
  if (imageUrl.length <= 0) errors.imageUrl = 'You must provide a imageUrl!';
  //* Return errors
  return errors;
}

//* get error messages
function getErrorMessages(errors) {
  const errs = Object.values(errors);
  if (errs.length !== 0)
    return errs.map((x, index) => {
      return (
        <span className='zoomable' key={index}>
          {x}
        </span>
      );
    });
  return <></>;
}

export default EditProduct;
