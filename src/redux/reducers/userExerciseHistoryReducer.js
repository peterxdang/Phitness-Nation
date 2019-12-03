const userExerciseHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'EXERCISE_HISTORY':
        return state = action.payload;
      default:
        return state;
    }
  };
  
  export default userExerciseHistoryReducer;
  