const initialState = {
    currentUser: null,          // Store the current user data
    register_error: null,       // Store any registration errors
    auth_error: null,           // Store any auth errors
    get_user_error: null,       
    loading: false              
};

export const userReducer = (state = initialState, action) => {
    console.log(`Action: ${action.type}`, action); // Log action type and payload
    console.log("State before action:", state);

    let newState = { ...state }; // Always create a copy of the state

    switch (action.type) {
        case 'AUTH_USER':
            newState.currentUser = action.payload; // Update the user in the state
            newState.auth_error = null; // Reset any previous registration errors on success
            break;
        case 'AUTH_USER_ERROR':
            newState.auth_error = action.auth_error; // Store the error in the state
            newState.currentUser = null;
            break;
        case 'REGISTER_NEW_USER':
            newState.currentUser = action.payload; // Update the user in the state
            newState.register_error = null; // Reset any previous registration errors on success
            break;
        case 'REGISTER_NEW_USER_ERROR':
            newState.register_error = action.register_error; // Store the error in the state
            newState.currentUser = null;
            break;
        case 'GET_USER':
            newState.currentUser = action.payload; // Update the user in the state
            newState.get_user_error = null; // Reset any previous registration errors on success
            break;
        case 'GET_USER_ERROR':
            newState.get_user_error = action.get_user_error; // Store the error in the state
            break;
        case 'GET_USER_LOADING':
            return {
                ...state,
                loading: action.loading,
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                currentUser: null,
                register_error: null,
                get_user_error: null,       
                loading: false
            };
        default:
            return state; // If action type doesn't match, return the current state
    }

    console.log("State after action:", newState); // Log the updated state
    return newState;
};