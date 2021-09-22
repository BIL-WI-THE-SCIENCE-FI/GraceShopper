import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import { bindActionCreator } from 'redux'
import { productActions } from '../../store/ActionsCreators'
import ProductCell from './ProductCell'

const defaultQuery = {
  order: 'id',
  page: 1,
  limit: 10,
  filters: {
    search: { isSearch: false, searchTerm: '' },
    price: { isPrice: false, minPrice: 0, maxPrice: 0 },
    stock: { isStock: false, minStock: 0, maxStock: 0 },
    rating: { isRating: false, minRating: 0, maxRating: 0 }
  }
}

const Products = () => {
  const { products } = useSelector(state => state.products)
  const dispatch = useDispatch()
  // const {fetchProducts} = bindActionCreator(fetchProducts, dispatch())
  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts())
    }
    fetchData()
  }, [])

  return (
    <div className="ProductGrid">
      {products.length > 0 ? (
        products.map(eachProduct => <ProductCell key={eachProduct.id} item={eachProduct} />)
      ) : (
        <p>Loading</p>
      )}
    </div>
  )
}

export default Products
