import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../store/ActionsCreators';
import { useParams } from 'react-router-dom';
import { getMoney } from '../../utils';

const EditProduct = (props) => {
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      console.log('Params ID is', id);
      await dispatch(productActions.fetchProduct(id));
    }
    fetchData();
  }, []);
  const { product } = useSelector((state) => state.products);
  const [error, setError] = useState();
  const [name, setName] = useState(product.name);
  const [desc, setDesc] = useState(product.description);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImgUrl] = useState(product.imageUrl);
  const dispatch = useDispatch();

  return (
    <div>
      <form id='form_product_edit' className='form-product-edit'>
        <div className='form-input-submit-group'>
          {error ? <h3 className='error-label'>{error}</h3> : null}
          <label htmlFor='productName'>Product Name</label>
          <input
            className='form-text-box'
            type='text'
            name='productName'
            value={name}
            placeholder='Product Name'
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor='productDesc'>Product Description</label>
          <input
            className='form-text-box'
            type='text'
            name='productDesc'
            value={desc}
            placeholder='Product Description'
            onChange={(event) => setDesc(event.target.value)}
          />
          <label htmlFor='stock'>Number in Stock</label>
          <input
            className='form-text-box'
            type='text'
            name='email'
            value={stock}
            placeholder='Stock Qty'
            onChange={(event) => setStock(event.target.value)}
          />
          <label htmlFor='price'>Product Price</label>
          <input
            className='form-text-box'
            type='text'
            name='email'
            value={`$${getMoney(price)}`}
            placeholder='Product Price'
            onChange={(event) => setPrice(event.target.value)}
          />
          <label htmlFor='imageUrl'>Image Url</label>
          <input
            className='form-text-box'
            type='text'
            name='imageUrl'
            value={imageUrl}
            placeholder='Image URL'
            onChange={(event) => setImgUrl(event.target.value)}
          />
          <button className='submit-button' type='submit'>
            Submit Edit
          </button>
        </div>
      </form>
    </div>
  );
};
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
export default EditProduct;
