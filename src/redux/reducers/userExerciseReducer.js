const userExerciseReducer = (state = [], action) => {
    switch (action.type) {
      case 'USER_EXERCISE_LIST':
        return state = action.payload;
      default:
        return state;
    }
  };
  
  export default userExerciseReducer;
  