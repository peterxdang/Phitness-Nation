const loginMode = (state = 'login', action) => {
    switch (action.type) {
      case 'SET_TO_LOGIN_MODE':
        return 'login';
      case 'SET_TO_ADD_USER_MODE':
        return 'adduser';
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default loginMode;
  