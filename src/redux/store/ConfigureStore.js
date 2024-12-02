import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "../reducer/CounterReducer";
import { productCategoryReducer } from "../reducer/ProductCategoryReducer";
import { productReducer } from "../reducer/ProductReducer";
import { productPageReducer } from "../reducer/ProductPageReducer";
import { userReducer } from "../reducer/UserReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    productPage: productPageReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;