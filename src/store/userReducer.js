const INITIAL_STATE = {
    userEmail: '',
    userLogged: 0, //0 logged in user, 1 logged out user      
};

function userReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'LOG_IN':
            return {...state, userLogged: 1, userEmail: action.userEmail}
        case 'LOG_OUT':
            return {...state, userLogged: 0, userEmail: ''}
        default:
            return state;
    }
}

export default userReducer;