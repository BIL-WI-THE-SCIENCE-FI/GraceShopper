import React from 'react'
import { Link } from 'react-router-dom'
import PriceFilter from './PriceFilter'
import StockFilter from './StockFilter'
import RatingFilter from './RatingFilter'
import ItemsPerPage from './ItemsPerPage'

// TODO: complete this feature, shouldn't take me long ~ brynn

const FilterPanel = props => {
  const { query, setOrder, setPriceFilter, setRatingFilter, setStockFilter, setLimit } = props
  const { price, stock, rating } = query.filters

  return (
    <div className="filter">
      <div>
        <PriceFilter isValid={isValid} setPriceFilter={setPriceFilter} price={price} />
        <StockFilter isValid={isValid} setStockFilter={setStockFilter} stock={stock} />
        <RatingFilter isValid={isValid} setRatingFilter={setRatingFilter} rating={rating} />
        <ItemsPerPage isValid={isValid} setLimit={setLimit} limit={query.limit} />
      </div>
    </div>
  )
}

function isValid(value, rating = false) {
  //* If the value is not a number or is less than zero
  if (value.length < 0.5 || isNaN(value) || parseFloat(value) <= 0) return false
  if (rating && parseFloat(value) > 5) return false
  return true
}

export default FilterPanel
