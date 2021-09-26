import React from 'react'

export default function PriceFilter(props) {
  const { isValid, setPriceFilter, price } = props
  //* Return JSX
  return (
    <div>
      <span>Price Filter</span>
      <div className="product-filter-input">
        <div>
          <label>Min</label>
          <input
            className="form-text-box"
            type="number"
            name="price-min"
            step="1"
            min="0"
            onChange={event => {
              const value = event.target.value
              if (!isValid(value)) {
                setPriceFilter(false, 0, price.maxPrice)
                event.target.value = ''
                return
              }
              const isPrice = parseInt(value) != 0 || price.maxPrice != 0
              setPriceFilter(isPrice, parseInt(value), price.maxPrice)
            }}
          />
        </div>
        <div className="product-filter-input">
          <label>Max</label>
          <input
            className="form-text-box"
            type="number"
            name="price-max"
            step="1"
            min="0"
            onChange={event => {
              const value = event.target.value
              if (!isValid(value)) {
                setPriceFilter(false, price.minPrice, 0)
                event.target.value = ''
                return
              }
              const isPrice = parseInt(value) != 0 || price.minPrice != 0
              setPriceFilter(isPrice, price.minPrice, parseInt(value))
            }}
          />
        </div>
      </div>
    </div>
  )
}
