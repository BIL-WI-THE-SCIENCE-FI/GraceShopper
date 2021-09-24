import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { orderActions } from '../../store/ActionsCreators'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

const LoggedInCart = props => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { order } = useSelector(state => state.order)

  useEffect(() => {
    async function fetchData() {
      await dispatch(orderActions.fetchOrder(id))
    }
    fetchData()
  }, [])

  return (
    <div className="currentorder-container">
      <div>
        <div>
          <SimpleBar className="currentorder-scoll">
            {/* Orders will go here*/}
            {/*  */}
          </SimpleBar>
        </div>
        <div>
          <div>
            <h3>Total:</h3>
            <span>{order !== undefined ? 'test' : 'test'}</span>
          </div>
          <div>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoggedInCart
