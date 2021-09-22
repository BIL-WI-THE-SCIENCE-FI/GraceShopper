import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ProductCell = props => {
  return (
    <div>
      <div>{props.item.name}</div>
      <div>
        <img className="gridImage" src={props.item.imageUrl} />
      </div>
      <div>Description: {props.item.description}</div>
      <div>${props.item.price}</div>
      <div>Rating {props.item.rating}</div>
      <div>Inventory {props.item.stock}</div>
    </div>
  )
}

export default ProductCell
