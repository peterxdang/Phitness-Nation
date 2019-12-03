import { combineReducers } from 'redux';


const injuriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INJURIES':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    injuriesReducer,
});