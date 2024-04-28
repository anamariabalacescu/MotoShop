export const ACTION_TYPES = {
    ADD_MOTOR_TYPE: 'ADD_MOTOR_TYPE',
    ALL_MOTOR_TYPES: 'ALL_MOTOR_TYPES'
};
const initialState = {
    motorTypes: []
};

const motorTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        // Add case statements for different actions here
        case ACTION_TYPES.ADD_MOTOR_TYPE:
            return {
                ...state,
                motorTypes: [...state.motorTypes, action.payload]
            };
        case ACTION_TYPES.ALL_MOTOR_TYPES:
            return {
                ...state,
                motorTypes: action.payload
            };
        default:
            return state;
    }
};

export default motorTypesReducer;