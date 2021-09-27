import { Collapse, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { userActions } from '../../store/ActionsCreators'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

//* Show the users profile information
export default function UserProfile() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const userId = useSelector(state => state.auth.id)
  const userType = useSelector(state => state.auth.userType)

  useEffect(() => {
    async function fetchData() {
      //* If a regular user is looking for a specific profile
      //* they are not allowed, so we will onlly show theirs
      const profileId = id && userType === 'admin' ? id : userId
      await dispatch(userActions.fetchUser(profileId))
    }
    fetchData()
  }, [])

  //* Actual user object used to render profile
  const user = useSelector(state => state.user.user)
  const { username, firstName, lastName, email, phone, orders, imageUrl } = user

  //! Remove
  console.log('--------------------')
  console.log('user:', user)
  console.log('--------------------')
  //! Remove

  //* Return JSX
  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <div className="user-profile-info">
          <div className="displays">
            {getDisplayItem('Username', username)}
            {getDisplayItem('First', firstName)}
            {getDisplayItem('Last', lastName)}
            {getDisplayItem('Email', email)}
            {getDisplayItem('Phone', phone)}
            {getDisplayItem('Image', imageUrl)}
          </div>
          <button className="zoomable">Edit Profile</button>
        </div>
        <div className="user-profile-image">
          <img src={imageUrl} alt="No Image Found" />
        </div>
        <div className="user-profile-order">
          <div>
            <SimpleBar className="user-profile-scroll">{getOrders(orders)}</SimpleBar>
          </div>
        </div>
      </div>
    </div>
  )
}

//* Get the JSX of the orders
function getOrders(orders) {
  //* Order have not loaded yet
  if (!orders) {
    return <></>
  }
  //* If the user has no orders
  if (orders.length === 0) return <></>
  // TODO:
  return orders.map(order => {
    console.log(order)
    return <OrderItem key={order.id} order={order} />
  })
}

//* Order item component
function OrderItem(props) {
  const [open, setOpen] = useState(false)
  const { id, status, orderdetails } = props.order

  return (
    <div className="individual-order-item">
      <div
        className="order-item-container"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <div className="order-item">
          {getDisplayItem('Status', status)}
          {getDisplayItem('Products', orderdetails.length)}
        </div>
      </div>
      <Collapse in={open}>
        <div id={`order-${id}`} className="order-collapse">
          <ul>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
            <li>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </li>
          </ul>
        </div>
      </Collapse>
    </div>
  )
}

//* Get the user display items
function getDisplayItem(type, phrase) {
  return (
    <div className="display" key={type}>
      <label>{type + ':'}</label>
      <span>{phrase ? phrase : 'None'}</span>
    </div>
  )
}
