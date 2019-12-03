import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';

//fetch goals. automatically fetches goals for the logged in user
function* fetchGoals(){
    try{
        const response = yield axios.get('/api/goals')
        yield put ({ type: 'SET_GOALS', payload: response.data})
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}
//post goal saga, send: { user_id: int, type: "String", description: "String" }
function* postGoals(action){
    try{
        yield axios.post('/api/goals', action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_GOALS', payload: connect.id()})
        }else{
            yield put ({ type: 'FETCH_GOALS'})
        }
    }catch (error) {
        console.log('POST GOALS ERROR:', error);
    }
}
//update goal saga, send: { goal id: int, type: "String", description: "String" }
function* updateGoals(action){
    try{
        axios.put('/api/goals', action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_GOALS', payload: connect.id()})
        }else{
            yield put ({ type: 'FETCH_GOALS'})
        }
    }catch (error) {
        console.log('PUT GOALS ERROR:', error);
    }
}
//delete goal saga, send the id of the goal as the payload
function* deleteGoals(action){
    try{
        axios.delete('/api/goals/' + action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_GOALS', payload: connect.id()})
        }else{
            yield put ({ type: 'FETCH_GOALS'})
        }
    }catch (error) {
        console.log('DELETE GOALS ERROR:', error);
    }
}
//admin get goals saga, send the id of the user you want the goals for
function* adminGetGoals(action){
    try{
        const response = yield axios.get('/api/admin/goals/' + action.payload)
        yield put ({ type: 'SET_GOALS', payload: response.data})
    }catch (error) {
        console.log('ADMIN GET GOALS ERROR:', error)
    }
}

function* goalsSaga() {
    yield takeLatest('FETCH_GOALS', fetchGoals);
    yield takeLatest('POST_GOAL', postGoals);
    yield takeLatest('UPDATE_GOAL', updateGoals);
    yield takeLatest('DELETE_GOAL', deleteGoals);
    yield takeLatest('ADMIN_FETCH_GOALS', adminGetGoals);
}


export default goalsSaga;