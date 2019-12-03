import { combineReducers } from 'redux';


const philReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PHIL':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    philReducer,
});