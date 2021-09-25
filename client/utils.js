import React from 'react'

//* Convert pennies to dollars (TODO: remove / do on front end?)
export function getMoney(price) {
  return parseFloat(price / 100).toLocaleString()
}

//* Convert rating to stars
export function getStars(rating) {
  const output = []
  for (let i = 0; i < 5; i++) {
    if (rating > 0 && rating < 1) {
      //* TODO: Half star
    }
    if (rating > 0) {
      output.push(
        <span key={i} className="stars">
          ★
        </span>
      )
      rating--
      continue
    }
    output.push(
      <span key={i} className="stars">
        ☆
      </span>
    )
  }
  return output
}
