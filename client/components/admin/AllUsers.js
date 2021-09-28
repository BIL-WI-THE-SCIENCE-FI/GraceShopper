import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/ActionsCreators/userActions';
import UserCard from '../admin/UserCard';

//* This is the component that should render when an admin types /users
//* It will allow them to view all individual users
export default function AllUsers(props) {
  const isLoggedIn = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(dispatch(fetchUsers));
  const usersInView = users;

  return (
    <div className='product-page'>
      <div className='product-container'>
        <SimpleBar className='product-scroll'>
          <div className='products-container'>
            {usersInView !== undefined && usersInView.length > 0 ? (
              usersInView.map((product) => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
