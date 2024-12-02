const initialState = {
    categories: [],               // Список продуктов
    currentCategory: null,
    loading: false,               // Состояние загрузки
    error: null                   // Ошибка (если есть)
};

export const productCategoryReducer = (state = initialState, action) => {
    console.log(`Action: ${action.type}`, action);
    console.log("State before action:", state);

    let nextState; // Переменная для хранения следующего состояния

    switch (action.type) {
        // Запит на завантаження категорій продуктів
        case 'FETCH_PRODUCT_CATEGORIES_REQUEST':
            nextState = {
                ...state,
                loading: true,
            };
            break;
        // Категорії успішно завантаженні
        case 'FETCH_PRODUCT_CATEGORIES_SUCCESS':
            nextState = {
                ...state,
                loading: false,
                categories: action.payload,
                currentCategory: action.payload[0],
            };
            break;
        // Помилка при завантаженні категорій
        case 'FETCH_PRODUCT_CATEGORIES_FAILURE':
            nextState = {
                ...state,
                loading: false,
                error: action.error,
            };
            break;
        case 'SET_CURRENT_PRODUCT_CATEGORY':
            nextState = {
                ...state,
                currentCategory: state.categories.filter(x => x.id === action.newId)[0]
            };
            break;
        default:
            nextState = state;  
    }

    // Логирование состояния после действия
    console.log("State after action:", nextState);

    return nextState;
};
