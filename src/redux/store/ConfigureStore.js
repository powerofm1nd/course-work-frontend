import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "../reducer/CounterReducer";
import { productCategoryReducer } from "../reducer/ProductCategoryReducer";
import { productReducer } from "../reducer/ProductReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    productCategory: productCategoryReducer,
    product: productReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;