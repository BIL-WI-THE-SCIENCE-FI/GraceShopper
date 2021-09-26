import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { userActions } from '../../store/ActionsCreators'

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
          <span>{'Username: ' + username}</span>
          <span>{'First: ' + firstName}</span>
          <span>{'Last: ' + lastName}</span>
          <span>{'Email: ' + email}</span>
          <span>{'Phone: ' + phone}</span>
        </div>
        <div className="user-profile-image">
          <img src={imageUrl} alt="No Image Found" />
        </div>
        <div className="user-profile-order">
          <div></div>
        </div>
      </div>
    </div>
  )
}

//* Get the JSX of the orders
function getOrders(orders) {
  //* If the user has no orders
  if (orders.length === 0) return <></>
  // TODO:
  return orders.map(order => {})
}
