import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUser } from '../../store/ActionsCreators/userActions';
import { useParams } from 'react-router-dom';

//
export default function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = window.localStorage.getItem('token');
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchUser(id, token));
    }
    fetchData();
  }, []);
  //* Obtain the information required thru store
  const { username, userType, firstName, lastName, phone, imageUrl, email } =
    useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.auth.id);
  const stateUserType = useSelector((state) => state.auth.userType);
  //* Return the component JSX

  function getDisplayItem(type, phrase) {
    return (
      <div className='display' key={type}>
        <label>{type + ':'}</label>
        <span>{phrase ? phrase : 'None'}</span>
      </div>
    );
  }

  return (
    <div className='user-profile'>
      <div className='user-profile-container'>
        <div className='user-profile-info'>
          <div className='displays'>
            {getDisplayItem('Username', username)}
            {getDisplayItem('First', firstName)}
            {getDisplayItem('Last', lastName)}
            {getDisplayItem('Email', email)}
            {getDisplayItem('Phone', phone)}
            {getDisplayItem('Image', imageUrl)}
          </div>
          <button className='zoomable'>Edit Profile</button>
        </div>
        <div className='user-profile-image'>
          <img src={imageUrl} alt='No Image Found' />
        </div>
      </div>
    </div>
  );
}
