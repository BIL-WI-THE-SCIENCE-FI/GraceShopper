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
  return (
    <div className='product-card shadow zoomable-small'>
      <div>
        <div onClick={() => history.push(`/products/${id}`)}>
          <div>
            <img src={imageUrl} alt='Product Image' />
            <h4>
              {firstName}, {lastName}
            </h4>
          </div>
          <div className='content'>
            <div className='desc'>
              <span>{username}</span>
            </div>
            <div className='info'>
              <p>{`Phone: ${phone}`}</p>
            </div>
          </div>
        </div>
        {isLoggedIn && stateUserType === 'admin' ? (
          <div>
            <button onClick={() => history.push(`edit/user/${id}`)}>
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
