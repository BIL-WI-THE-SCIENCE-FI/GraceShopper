import React from 'react'

export default function ItemsPerPage(props) {
  const { isValid, setLimit, limit } = props
  //* Return JSX
  return (
    <div>
      <span>Products Per Page</span>
      <div className="product-filter-input">
        <div>
          <label>Total</label>
          <input
            className="form-text-box"
            type="number"
            name="rating-min"
            step="5"
            min="5"
            max="100"
            value={limit}
            onChange={event => {
              const value = event.target.value
              if (!isValid(value)) {
                event.target.value = ''
                return
              }
              setLimit(parseInt(value))
            }}
          />
        </div>
      </div>
    </div>
  )
}
