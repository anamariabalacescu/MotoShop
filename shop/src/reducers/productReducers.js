

export const ACTION_TYPES = {
    ALL_PRODUCTS: 'ALL_PRODUCTS',
};
const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        // Add more cases for other actions if needed
        default:
            return state;
    }
};

export default productReducer;