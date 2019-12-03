import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';


function* fetchWeeks(action){
    try{
        const response = yield axios.get('/api/admin/weeks/' + action.payload.id)
        let weeks = []
        for(let i=0; i<response.data.length; i++){
            if(weeks.map(function(e) { return e.week; }).indexOf(response.data[i].week) < 0){
                weeks.push(response.data[i])
            }
        }
        yield put ({ type: 'SET_WEEKS', payload: weeks })
    }catch (error) {
        console.log('FETCH WEEKS ERROR:', error)
    }
}
//gets all exercises that are active from the database and then sets them to a reducer
//send: {active: Boolean}
function* fetchExercises(action){
    try{
        const response = yield axios.get(`/api/admin/exercise/${action.payload.active}`)
        yield put ({ type: 'SET_EXERCISES', payload: response.data })
    }catch(error){
        console.log('FETCH EXERCISES ERROR:', error)
    }
}
//adds a workout to the database and gets them afterwords. send: {name: "String", description: "String"}
function* postExercise (action){
    try{
        yield axios.post(`/api/exerciseWorkouts/addExercise`, action.payload)
        yield put({ type: 'FETCH_EXERCISES', payload: {active: true }})
    }catch (error) {
        console.log('POST EXERCISE WORKOUTS ERROR:', error);
    }
}

//fetch exercise workouts. automatically fetches goals for the logged in user
function* fetchExerciseWorkouts(action){
    try{
        const response = yield axios.get(`/api/exerciseWorkouts/${action.payload}`)
        yield put ({ type: 'SET_EXERCISE_WORKOUTS', payload: response.data})
    }catch (error) {
        console.log('FETCH EXERCISE WORKOUTS ERROR:', error);
    }
}
//update exercise workouts, send: { id of exercise workout: int, completed_reps: int, completed_sets: int, completed_weight: int, feedback: int }
function* updateExerciseWorkouts(action){
    try{
        console.log('the exercise results are:', action.payload)
        yield axios.put('/api/exerciseWorkouts', action.payload)
    }catch (error) {
        console.log('UPDATE EXERCISE WORKOUTS ERROR')
    }
}

// admin edit exercises in library
function* editExercise(action){
    try {
        yield axios.put(`/api/admin/exerciseDetail/${action.payload.id}`, action.payload)
    } catch (error) {
        console.log('UPDATE EXERCISE WORKOUTS ERROR')
    }
}

//admin update exercise workouts, send: { id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
function* adminUpdatedExerciseWorkouts(action){
    try{
        yield axios.put('/api/admin/exerciseWorkouts', action.payload.exercise)
        yield put ({ type: 'ADMIN_FETCH_WORKOUTS_TRANSFORMED', payload: action.payload.user_id})
    }catch (error) {
        console.log('ADMIN UPDATE EXERCISE WORKOUTS ERROR:', error)
    }
}

// admin delete exercise, send the id of the exercise you want to delete from the exercises table
function* deleteExercise(action){
    try {
        yield axios.delete('/api/admin/exerciseDetail/' + action.payload)
    } catch (error) {
        console.log('ADMIN DELETE EXERCISE ERROR:', error)
    }
}


//admin delete exercise workouts, send the id of the exercise workout and the id of the user
function* deleteExerciseWorkouts(action){
    try{
        yield axios.delete('/api/admin/exerciseWorkouts/' + action.payload.id)
        yield put ({ type: 'ADMIN_FETCH_WORKOUTS_TRANSFORMED', payload: action.payload.user_id})
    }catch (error) {
        console.log('ADMIN DELETE EXERCISE WORKOUTS ERROR:', error)
    }
}
//admin get exercise workouts compliance data, automatically get the "current" users compliance data
function* getComplianceData(action){
    try{
        const response = yield axios.get('/api/admin/data/' + action.payload)
        yield put ({ type: 'SET_COMPLIANCE', payload: response.data })
    }catch (error){
        console.log('ERROR GETTING COMPLIANCE DATA:', error)
    }
}
//admin post exercise workouts, send: {workout_id: int, exercise_id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
function* postExerciseWorkouts(action){
    try{
        yield axios.post('/api/admin/newExerciseWorkouts', action.payload.exercise)
        yield put ({ type: 'ADMIN_FETCH_WORKOUTS_TRANSFORMED', payload: action.payload.user_id})
    }catch (error) {
        console.log('POST EXERCISE WORKOUTS ERROR')
    }
}
function* workoutsSaga(){
    yield takeLatest('FETCH_EXERCISE_WORKOUTS', fetchExerciseWorkouts);
    yield takeLatest('UPDATE_EXERCISE_WORKOUTS', updateExerciseWorkouts);
    yield takeLatest('POST_EXERCISE_WORKOUTS', postExerciseWorkouts);
    // yield takeLatest('ADMIN_FETCH_EXERCISE_WORKOUTS', adminFetchExerciseWorkouts)
    yield takeLatest('ADMIN_UPDATE_EXERCISE_WORKOUTS', adminUpdatedExerciseWorkouts)
    yield takeLatest('DELETE_EXERCISE_WORKOUTS', deleteExerciseWorkouts)
    yield takeLatest('FETCH_COMPLIANCE', getComplianceData)
    yield takeLatest('ADD_EXERCISE', postExercise);
    yield takeLatest('FETCH_EXERCISES', fetchExercises)
    yield takeLatest('FETCH_WEEKS', fetchWeeks);
    yield takeLatest('PERMANENTLY_DELETE_EXERCISE', deleteExercise);
    yield takeLatest('EDIT_EXERCISE', editExercise);
}

export default workoutsSaga;

//OLD SAGAS MAY NEED IN THE FUTURE:

//admin fetch exercise workouts, send if of the workout you want
// function* adminFetchExerciseWorkouts(action){
//     try{
//         const response = yield axios.get('/api/admin/exerciseWorkouts/' + action.payload)
//         yield put ({ type: 'SET_EXERCISE_WORKOUTS', payload: response.data })
//     }catch (error) {
//         console.log('ADMIN FETCH EXERCISE WORKOUTS ERROR:', error)
//     }
// }