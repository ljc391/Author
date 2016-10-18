import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const CREATE_USER = "CREATE_USER";
const CLEAR_CURRENT_USER ="CLEAR_CURRENT_USER";
/* ------------   ACTION CREATORS     ------------------ */

const login  = user => ({ type: SET_CURRENT_USER, user })
const signup = user => ({type: CREATE_USER, user})
const signout = () => ({type: CLEAR_CURRENT_USER});


/* ------------       REDUCER     ------------------ */

export default function reducer (user = null, action) {
  switch (action.type) {

    case  SET_CURRENT_USER:{
      console.log("SET_CURRENT_USER:-----------", action.user);
      return action.user
    }

    case CREATE_USER:
      return action.user

    case CLEAR_CURRENT_USER:
      return null;


    default:
      return user;
  }
}

export const verifyUser = user => dispatch => {
  axios.post('/login', user)
       .then(res => {return dispatch(login(res.data))})
       .catch(err => console.error(`Verify user: ${user} unsuccesful`, err))
}

export const createUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => {console.log("res.data-----", res); return dispatch(signup(res.data))})
       .catch(err => console.error(`Verify user: ${user} unsuccesful`, err))
}

export const logoutUser =  () => dispatch => {
  axios.get('/logout')
       .then(res => {console.log("res.data-----", res); return dispatch(signout())})
       .catch(err => console.error(`Verify user: ${user} unsuccesful`, err))
}

