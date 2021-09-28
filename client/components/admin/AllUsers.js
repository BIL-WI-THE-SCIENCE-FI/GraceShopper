import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { fetchUsers } from '../../store/ActionsCreators/userActions'
import UserCard from '../admin/UserCard'

//* This is the component that should render when an admin types /users
//* It will allow them to view all individual users

export default function ViewUsers() {
  const isLoggedIn = useSelector(state => state.auth.id)
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('token')
  useEffect(() => {
    //* fetch data
    async function fetchData() {
      await dispatch(fetchUsers(token))
    }
    fetchData()
  }, [])
  const usersInView = useSelector(state => state.user.users)

  return (
    <div className="product-page">
      <div className="product-container">
        <SimpleBar className="product-scroll">
          <div className="products-container">
            {usersInView !== undefined && usersInView.length > 0 ? (
              usersInView.map(user => <UserCard key={user.id} user={user} />)
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}
