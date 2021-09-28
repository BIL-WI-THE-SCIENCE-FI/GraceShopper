import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/ActionsCreators/userActions';
import UserCard from '../admin/UserCard';
import SimpleBar from 'simplebar';

//* This is the component that should render when an admin types /users
//* It will allow them to view all individual users

const AllUsers = () => {
  const isLoggedIn = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');
  useEffect(() => {
    //* fetch data
    async function fetchData() {
      await dispatch(fetchUsers(token));
    }
    fetchData();
  }, []);
  const usersInView = useSelector((state) => state.user.users);
  console.log(usersInView);

  return (
    <div className='product-page'>
      <div className='product-container'>
        <div className='products-container'>
          {usersInView !== undefined && usersInView.length > 0 ? (
            usersInView.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
