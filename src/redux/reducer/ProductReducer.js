const initialState = {
    currentProduct: null,
};

export const productReducer = (state = initialState, action) => {
    console.log(`Action: ${action.type}`, action);
    console.log("State before action:", state);

    let newState;

    switch (action.type) {
        case 'CREATE_PRODUCT':
            newState = {
                ...state,
                currentProduct: action.newProduct,
            };
            break;
        case 'GET_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_PRODUCT_SUCCESS':
            return {
                ...state,
                currentProduct: action.newCurrentProduct,
                loading: false,
                error: null,
            };
        case 'GET_PRODUCT_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            newState = state;
    }

    // Логування нового стану
    console.log("State after action:", newState);

    return newState;
};

