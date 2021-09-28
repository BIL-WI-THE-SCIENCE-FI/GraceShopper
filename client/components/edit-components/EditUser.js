import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUser } from '../../store/ActionsCreators/userActions';
import { useParams } from 'react-router-dom';

//
export default function EditUser() {
  const token = window.localStorage.getItem('token');
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  //* Has the component loaded
  const [loaded, setLoaded] = useState(false);
  //^ Get the user from state
  const user = useSelector((state) => state.user.user);
  const { username, userType, firstName, lastName, phone, imageUrl, email } = user 
  
  useEffect(() => {
    async function fetchData() {
      if (!loaded) await dispatch(fetchUser(id, token));
    }
    fetchData();
  }, [user]);

    //^ State to store product info / changes in
    const [state, setState] = useState({
        username: '',
        userType: '',
        firstName: '',
        lastName: '',
        phone: 0,
        imageUrl: ''
        email: ''
      })

    //^ Load user into state
  if (!loaded && user.username) {
    setState({ ...user })
    setLoaded(true)
  }
  //* If there are any form errors
  const [errors, setErrors] = useState([])

  //* Attempt to submit form
  function attemptSubmit() {
    //* Check for errors using state
    const errors = checkValidity(state, user)
    setErrors(errors)
    //^ If there are errors
    if (Object.values(errors).length > 0) return false
    //^ Async function to make update request
    //^ Make initial check before request to see if Token even exists
    async function updateUser() {
      try {
        //* Make attempt to update
        //^ Send token from local storage for analysis
        await axios.post(`/api/user/${id}`, state, {
          headers: {
            authorization: token
          }
        })
        //* Catch errors
      } catch (error) {
        errors.error = 'Failed to update user'
        return false
      }
    }

    //* Update product
    updateUser()
    return true
  }
  //* Obtain the information required for render thru store
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
  //^ Check validity and get error message
function checkValidity(state, user) {
    //^ destructure state
    const { firstName, lastName, phone, imageUrl, email } = state
    const errors = []
  
    //^ Check if nothing has changed
    if (JSON.stringify(state) === JSON.stringify(user))
      errors.same = 'You must change something, or cancel!'
    //^ Check if firstName is valid
    if (firstName.length <= 0) errors.firstName = 'You must provide a first name!'
    //^ Check if lastName is valid
    if (lastName.length <= 0) errors.lastName = 'You must provide a last name!'
    //^ Check if phone is vaild
    if (phone.length <= 0) errors.phone = 'You must provide a phone number!'
    //^ Check if email is valid
    if (email.length <= 0) errors.email = 'You must provide an e-mail!'
    //^ Check if imageUrl is valid
    if (imageUrl.length <= 0) errors.imageUrl = 'You must provide a imageUrl!'
    //^ Return errors
    return errors
  }
  
  //* get error messages
  function getErrorMessages(errors) {
    const errs = Object.values(errors)
    if (errs.length !== 0)
      return errs.map((x, index) => {
        return (
          <span className="zoomable" key={index}>
            {x}
          </span>
        )
      })
    return <></>
  }

