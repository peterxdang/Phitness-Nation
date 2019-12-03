import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import goalsSaga from './goalsSaga';
import injuriesSaga from './injuriesSaga';
import workoutsSaga from './workoutsSaga';
import exerciseWorkoutSaga from './exerciseWorkoutSaga';
import addUserSaga from './addUserSaga';
import deleteUserSaga from './deleteUserSaga';
import reactivateUserSaga from './reactivateUserSaga';
import userExerciseSaga from './userExerciseSaga';
import archiveUserSaga from './archiveUserSaga';
import addPhilSaga from './addPhilSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    goalsSaga(),
    injuriesSaga(),
    workoutsSaga(),
    exerciseWorkoutSaga(),
    addUserSaga(), 
    deleteUserSaga(),
    reactivateUserSaga(),
    userExerciseSaga(),
    archiveUserSaga(),
    addPhilSaga()
  ]);
}
