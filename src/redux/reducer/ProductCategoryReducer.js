const initialState = {
    categories: [],               // Список продуктов
    currentCategory: null,
    loading: false,             // Состояние загрузки
    error: null                // Ошибка (если есть)
};

export const productCategoryReducer = (state = initialState, action) => {
    console.log(`Action: ${action.type}`, action);
    console.log("State before action:", state);

    switch (action.type) {
        // Запит на завантаження категорій продуктів
        case 'FETCH_PRODUCT_CATEGORIES_REQUEST':
            return {
                ...state,
                loading: true,
            };
        // Категорії успішно завантаженні
        case 'FETCH_PRODUCT_CATEGORIES_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: action.payload,  
                currentCategory: action.payload[0],
            };
        // Помилка при завантаженні категорій
        case 'FETCH_PRODUCT_CATEGORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error, 
            };
        case 'SET_CURRENT_PRODUCT_CATEGORY':
            return {
                ...state,
                currentCategory: state.categories.filter(x => x.id === action.newId)[0]
            };
        default:
            return state;  
    }
};