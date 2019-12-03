import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

function* editrctv(action) {
    try {
        console.log(action.payload);

        yield axios.put(`/api/user/reactivate/${action.payload}`, action.payload)
    } catch (error) {
        console.log('UPDATE EXERCISE WORKOUTS ERROR')
    }
}

function* reactivateUserSaga() {
    yield takeEvery('REACTIVATE_USER', editrctv);
}

export default reactivateUserSaga;