
import { combineReducers } from 'redux';

let responses = ""
const adminToUserReducer = (state = responses, action) => {

  if (action.type === 'ACCESS_USER_INFO') {
    return action.payload
  }
  return state;
}
const adminEditUserReducer = (state = {}, action) =>{
  switch(action.type){
    case 'SET_ADMIN_EDIT_USER':
      return action.payload
    default:
      return state
  }
}


export default combineReducers({
  adminToUserReducer,
  adminEditUserReducer,
});
