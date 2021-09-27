import { GET_ALL_USERS, GET_USER } from '.';

//* ------------------ Initial State -----------------------
const initialState = {
  user: {},
  users: [],
};

//*==================== REDUCER FUNCTION ====================
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_USERS:
      return { ...state, users: [...users, action.payload] };
    default:
      return state;
  }
}
