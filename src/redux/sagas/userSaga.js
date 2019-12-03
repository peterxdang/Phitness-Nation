import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import connect from './connect';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}
//saga to update user information, send: { id: int, name: "String", pronouns: "String", phone: "String", email: "String", emergency contact name: "String", emergency contact phone: "String", age/DOB: "String"}
function* updateUserSaga(action){
  try{
    yield axios.put('/api/user', action.payload)
    yield put ({ type: 'FETCH_USER' })
  }catch (error) {
    console.log('UPDATE USER PROFILE ERROR:', error);
  }

}
//admin fetch user saga, automatically gets the user based off the id in the adminToUserReducer
function* adminFetchUser(action){
  try{
    const response = yield axios.get('/api/admin/user/' + action.payload)
    yield put ({ type: 'SET_ADMIN_EDIT_USER', payload: response.data })
  }catch(error) {
    console.log('ADMIN GET USER ERROR:', error)
  }
}
//admin update user profile send: { id: int, name: "String", pronouns: "String", phone: "String", email: "String", emergency contact name: "String", emergency contact phone: "String", age/DOB: "String"}
function* adminUpdateUser(action){
  try{
    yield axios.put('/api/admin/edituser', action.payload )
    yield put ({ type: 'ADMIN_FETCH_USER', payload: action.payload.id})
  }catch(error){
    console.log('ADMIN UPDATE USER ERROR:', error)
  }
}
//update user's profile picture
function* updateUserImg(action){
  try{
    yield axios.put('/api/user/profilePic', action.payload )
    yield put ({ type: 'FETCH_USER'})
  }catch(error){
    console.log('USER UPDATE PROFILE PIC ERROR:', error)
  }
}

function* updateStreak(action){
  try {
    yield axios.put('/api/user/streak/'+action.payload)
    yield put({ type: 'FETCH_USER' })
  } catch (error) {
    console.log('UPDATE STREAK ERROR:', error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUserSaga);
  yield takeLatest('ADMIN_FETCH_USER', adminFetchUser);
  yield takeLatest('ADMIN_UPDATE_USER', adminUpdateUser);
  yield takeLatest('UPDATE_USER_IMG', updateUserImg);
  yield takeLatest('UPDATE_STREAK', updateStreak)
}

export default userSaga;
