import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
/* ------------   ACTION CREATORS     ------------------ */

const islogin  = () => ({ type: ADD_CURRENT_USER })
const islogout = () => ({ type:REMOVE_CURRENT_USER})


/* ------------       REDUCER     ------------------ */

export default function reducer (isLoggedIn = false , action) {
  switch (action.type) {

    case  ADD_CURRENT_USER:{
      return true;
    }

    case REMOVE_CURRENT_USER:{
      return false;
    }

    default:
      return isLoggedIn;
  }
}

export const setlogin = dispatch => {

      dispatch(islogin());

}

export const setlogout = () => dispatch => {
    dispatch(islogout());
}