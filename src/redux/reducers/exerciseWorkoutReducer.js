import { combineReducers } from 'redux';


const exerciseWorkoutReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXERCISE_WORKOUTS':
            return action.payload;
        default:
            return state;
    }
};
const complianceReducer = (state = [], action) =>{
    switch(action.type) {
        case 'SET_COMPLIANCE':
            return action.payload
        default:
            return state;
    }
}
const exerciseReducer = (state = [], action) =>{
    switch(action.type) {
        case 'SET_EXERCISES':
            return action.payload
        default:
            return state;
    }
}
const weeksReducer = (state = [], action) =>{
    switch(action.type) {
        case 'SET_WEEKS':
            return action.payload
        default:
            return state;
    }
}


export default combineReducers({
    exerciseWorkoutReducer,
    complianceReducer,
    exerciseReducer,
    weeksReducer,
});