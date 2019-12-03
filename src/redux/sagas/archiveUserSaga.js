import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "REACTIVATE_USER" actions
function* archiveUser(action) {
    try {
        yield axios.put('/api/user/archive', action.payload);
        console.log('arch saga', action.payload);
        
    } catch (error) {
        console.log('error while reactivating user', error)
    }
}

function* archiveUserSaga() {
    yield takeLatest('ARCHIVE_USER', archiveUser);
}

export default archiveUserSaga;