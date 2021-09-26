import React from 'react'

export default function RatingFilter(props) {
  const { isValid, setRatingFilter, rating } = props
  //* Return JSX
  return (
    <div>
      <span>Rating Filter</span>
      <div className="product-filter-input">
        <div>
          <label>Min</label>
          <input
            className="form-text-box"
            type="number"
            name="rating-min"
            step=".5"
            min="0"
            max="5"
            onChange={event => {
              const value = event.target.value
              if (!isValid(value, true)) {
                setRatingFilter(false, 0, rating.maxRating)
                event.target.value = ''
                return
              }
              const isRating = parseFloat(value) != 0 || rating.maxRating != 0
              setRatingFilter(isRating, parseFloat(value), rating.maxRating)
            }}
          />
        </div>
        <div className="product-filter-input">
          <label>Max</label>
          <input
            className="form-text-box"
            type="number"
            name="rating-max"
            step=".5"
            min="0"
            max="5"
            onChange={event => {
              const value = event.target.value
              if (!isValid(value, true)) {
                setRatingFilter(false, rating.minRating, 0)
                event.target.value = ''
                return
              }
              const isRating = parseFloat(value) != 0 || rating.minRating != 0
              setRatingFilter(isRating, rating.minRating, parseFloat(value))
            }}
          />
        </div>
      </div>
    </div>
  )
}
