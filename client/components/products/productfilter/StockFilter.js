import React from 'react'

export default function StockFilter(props) {
  const { isValid, setStockFilter, stock } = props
  //* Return JSX
  return (
    <div>
      <span>Stock Filter</span>
      <div className="product-filter-input">
        <div>
          <label>Min</label>
          <input
            className="form-text-box"
            type="number"
            name="stock-min"
            step="1"
            min="0"
            onChange={event => {
              const value = event.target.value
              if (!isValid(value)) {
                setStockFilter(false, 0, stock.maxStock)
                event.target.value = ''
                return
              }
              const isStock = parseInt(value) != 0 || stock.maxStock != 0
              setStockFilter(isStock, parseInt(value), stock.maxStock)
            }}
          />
        </div>
        <div className="product-filter-input">
          <label>Max</label>
          <input
            className="form-text-box"
            type="number"
            name="stock-max"
            step="1"
            min="0"
            onChange={event => {
              const value = event.target.value
              if (!isValid(value)) {
                setStockFilter(false, stock.minStock, 0)
                event.target.value = ''
                return
              }
              const isStock = parseInt(value) != 0 || stock.minStock != 0
              setStockFilter(isStock, stock.minStock, parseInt(value))
            }}
          />
        </div>
      </div>
    </div>
  )
}
