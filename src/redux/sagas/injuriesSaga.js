import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';

//fetch injuries. automatically fetches goals for the logged in user
function* fetchInjuries(){
    try{
        const response = yield axios.get('/api/injury')
        yield put ({ type: 'SET_INJURIES', payload: response.data})
    }catch (error) {
        console.log('FETCH INJURIES ERROR:', error);
    }
}
//post injury saga, send: { user_id: int, type: "String", description: "String", severity: int }
function* postInjury(action){
    try{
        yield axios.post('/api/injury', action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_INJURIES', payload: connect.id()})
        }else{
            yield put ({ type: 'FETCH_INJURIES'})
        }
    }catch (error) {
        console.log('POST INJURIES ERROR:', error);
    }
}
//update goal saga, send: { user_id: int, type: "String", description: "String", severity: int }
function* updateInjury(action){
    try{
        axios.put('/api/injury', action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_INJURIES', payload: connect.id()})
        }else{
            yield put ({ type: 'FETCH_INJURIES'})
        }
    }catch (error) {
        console.log('PUT INJURIES ERROR:', error);
    }
}
//delete goal saga, send the id of the goal
function* deleteInjury(action){
    try{
        axios.delete('/api/injury/' + action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_INJURIES', payload: connect.id()})
        }else{
            yield put ({ type: 'FETCH_INJURIES'})
        }
    }catch (error) {
        console.log('DELETE INJURIES ERROR:', error);
    }
}
//admin get injuries saga, send the id of the user you want the injuries for
function* adminGetInjuries(action){
    try{
        const response = yield axios.get('/api/admin/injuries/' + action.payload)
        yield put ({ type: 'SET_INJURIES', payload: response.data})
    }catch (error) {
        console.log('ADMIN GET INJURIES ERROR:', error)
    }
}
function* injuriesSaga() {
    yield takeLatest('FETCH_INJURIES', fetchInjuries);
    yield takeLatest('POST_INJURY', postInjury);
    yield takeLatest('UPDATE_INJURY', updateInjury);
    yield takeLatest('DELETE_INJURY', deleteInjury);
    yield takeLatest('ADMIN_FETCH_INJURIES', adminGetInjuries);
}

export default injuriesSaga;