import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

//* This is the product card that will appear on the all products
//* page.
export default function UserCard(props) {
  const history = useHistory();
  //* Obtain the information required thru props
  const {
    id,
    username,
    userType,
    firstName,
    lastName,
    phone,
    imageUrl,
    email,
  } = props.user;
  const isLoggedIn = useSelector((state) => state.auth.id);
  const userType = useSelector((state) => state.auth.userType);
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
              <span>{user}</span>
            </div>
            <div className='info'>
              <p>{`Phone: ${phone}`}</p>
              <p>{`Email: ${email}`}</p>
            </div>
          </div>
        </div>
        {isLoggedIn && userType === 'admin' ? (
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
