import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addPhil(action) {
  try {
    // clear any existing error on the registration page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
console.log(action.payload);

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/phil', action.payload);
  } catch (error) {
      console.log('Error with user registration:', error);
  }
}

function* updatePhil(action) {
  try {
    yield axios.put('/api/user/phil', action.payload);
  } catch (error) {
    console.log('error while reactivating user', error)
  }
}




function* addPhilSaga() {
  yield takeLatest('ADD_PHIL', addPhil);
  yield takeEvery('UPDATE_PHIL', updatePhil);
}

export default addPhilSaga;
