const initialState = {
    value: 0, // Поле для хранения значения
};

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, value: state.value + 1 }; // Увеличиваем value
        case "DECREMENT":
            return { ...state, value: state.value - 1 }; // Уменьшаем value
        default:
            return state; // Возвращаем текущее состояние
    }
};
