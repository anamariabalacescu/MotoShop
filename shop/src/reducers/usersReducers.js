export const ACTION_TYPES = {
    ADD_USER: 'ADD_USER',
    ALL_USERS: 'ALL_USERS'
};

// Import the action types

// Define the initial state
const initialState = {
    users: []
};

// Define the reducer function
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.data]
            };
        case ACTION_TYPES.ALL_USERS:
            return {
                ...state,
                users: action.data
            };
        default:
            return state;
    }
};

export default usersReducer;