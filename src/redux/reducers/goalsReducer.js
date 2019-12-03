import { combineReducers } from 'redux';


const goalsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GOALS':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    goalsReducer,
});