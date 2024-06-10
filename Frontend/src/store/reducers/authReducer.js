import { authActions } from "../actions/authActions";

const initState = {
  userDetails: null,
  isLoggedIn:false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case authActions.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: state.isLoggedIn = action.isLoggedIn
      }
    case authActions.LOGOUT:
      return {
        isLoggedIn: state.isLoggedIn = false
      }
    default:
      return state;
  }
};

export default reducer;
