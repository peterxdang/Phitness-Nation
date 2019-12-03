import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';

//fetch goals. automatically fetches goals for the logged in user
function* fetchWorkouts(){
    try{
        const response = yield axios.get('/api/workouts')
        yield put ({ type: 'SET_WORKOUTS', payload: response.data})
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}
//user update workouts send: { workout id: int, feedback: "String" }
function* updateWorkouts(action){
    try{
        yield axios.put('/api/workouts', action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_WORKOUTS', payload: connect.id() })
        }else{
            yield put ({ type: 'FETCH_WORKOUTS' })
        }
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}
//admin post workouts send: { user id: int, week: int }
function* postWorkouts(action){
    try{
        let id = 0;
        yield axios.post('/api/admin/workouts', {user_id: action.payload.user_id, week: action.payload.week})
        const newId = yield axios.get('/api/admin/workouts/exerciseWorkouts/' + action.payload.user_id + '-' + action.payload.week)
        let max = newId.data.length - 1
        id = newId.data[max].id
        for(let i = 0; i<action.payload.exercises.length; i++){
            yield axios.post('/api/admin/exerciseWorkouts', {workout_id: id, exercise: action.payload.exercises[i], order: (i + 1)})
        }
        if(action.payload.email){
            yield axios.get('/api/admin/email/' + action.payload.user_id)
        }
        yield put ({ type: 'ADMIN_FETCH_WORKOUTS_TRANSFORMED', payload: action.payload.user_id })
    }catch (error) {
        console.log('POST WORKOUTS ERROR', error)
    }
}
//admin get workouts saga send the id of the user you want workouts for
function* adminGetWorkouts(action){
    try{
        const response = yield axios.get('/api/admin/workouts/' + action.payload)
        yield put ({ type: 'SET_WORKOUTS', payload: response.data})
    }catch (error){
        console.log('ADMIN GET WORKOUTS ERROR:', error)
    }
}
//admin get workouts saga and data transformation, send the id of the user you want workouts for
function* adminGetWorkoutsTransformed(action){
    try{
        const workouts = yield axios.get('/api/admin/workouts/' + action.payload)
        let exercises = [];
        for(let i = 0; i< workouts.data.length; i++){
            const exercise = yield axios.get('/api/admin/exercises/' + workouts.data[i].id)
            for(let k = 0; k<exercise.data.length; k++){
                if (exercise.data[k]){
                exercises.push(exercise.data[k])
                }
            }
        }
        yield put ({ type: 'SET_WORKOUTS', payload: transform(workouts.data, exercises)})
    }catch (error){
        console.log('ADMIN GET WORKOUTS ERROR:', error)
    }
}
//admin updated workouts
function* adminUpdateWorkouts(action){
    try{
        yield axios.put('/api/admin/workouts', action.payload)
        yield put ({ type: 'ADMIN_FETCH_WORKOUTS', payload: connect.id()})
    }catch(error) {
        console.log('ADMIN UPDATE WORKOUTS ERROR', error)
    }
}
function* workoutsSaga(){
    yield takeLatest('FETCH_WORKOUTS', fetchWorkouts);
    yield takeLatest('UPDATE_WORKOUTS', updateWorkouts);
    yield takeLatest('POST_WORKOUTS', postWorkouts);
    yield takeLatest('ADMIN_FETCH_WORKOUTS', adminGetWorkouts);
    yield takeLatest('ADMIN_UPDATE_WORKOUTS', adminUpdateWorkouts);
    yield takeLatest('ADMIN_FETCH_WORKOUTS_TRANSFORMED', adminGetWorkoutsTransformed);
}

// (weeks.map(function(e) { return e.week; }).indexOf(response.data[i].week) < 0)
function transform(workouts, exercises){
    let weeks = []
    for(let i = 0; i<workouts.length; i++){
        let z = weeks.map(function(e) { return e.week; }).indexOf(workouts[i].week)
        if(z > -1){
            weeks[z].workouts.push({ 
                id: workouts[i].id, 
                user_id: workouts[i].user_id, 
                feedback: workouts[i].feedback, 
                complete: workouts[i].complete,
                exercises: [

                ], 
            })
        }else{
            weeks.push({
                week: workouts[i].week,
                workouts: [{
                    id: workouts[i].id,
                    user_id: workouts[i].user_id,
                    feedback: workouts[i].feedback,
                    complete: workouts[i].complete,
                    exercises: [

                    ]
                }]
            })
        }
    }
    for(let i = 0; i<exercises.length; i++){
        for(let k = 0; k<weeks.length; k++){
            for(let m = 0; m<weeks[k].workouts.length; m++){
                if(weeks[k].workouts[m].id === exercises[i].workout_id){
                    weeks[k].workouts[m].exercises.push(exercises[i])
                    break;
                }
            }
        }
    }
    return (weeks);
}
export default workoutsSaga;