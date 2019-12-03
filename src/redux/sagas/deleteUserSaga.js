import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

// worker Saga: will be fired on "DELETE_USER" actions
function* deleteUser(action) {
    try {
        yield axios.delete(`/api/workouts/${action.payload}`);
        yield axios.delete(`/api/user/${action.payload}`);
        yield put({ type: 'FETCH_USER', payload: action.payload })
    } catch (error) {
        console.log('error while deleting user', error)
    }
}

function* deleteUserSaga() {
    yield takeEvery('DELETE_USER', deleteUser);
}

export default deleteUserSaga;