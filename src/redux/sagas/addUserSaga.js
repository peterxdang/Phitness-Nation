import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);
  } catch (error) {
      console.log('Error with user registration:', error);
  }
}

function* addUserSaga() {
  yield takeLatest('ADD_USER', addUser);
}

export default addUserSaga;
