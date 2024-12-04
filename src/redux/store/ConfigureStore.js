import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { counterReducer } from "../reducer/CounterReducer";
import { basketReducer } from "../reducer/BasketReducer";
import { productCategoryReducer } from "../reducer/ProductCategoryReducer";
import { productReducer } from "../reducer/ProductReducer";
import { productPageReducer } from "../reducer/ProductPageReducer";
import { userReducer } from "../reducer/UserReducer";
import  orderReducer from "../reducer/OrderReducer";

const counterPersistConfig = {
    key: 'counter',
    storage,
};

const basketPersistConfig = {
    key: 'basket',
    storage,
};

const orderPersistConfig = {
    key: 'basket',
    storage,
};

const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);
const persistedBasketReducer = persistReducer(basketPersistConfig, basketReducer);


const rootReducer = combineReducers({
    counter: persistedCounterReducer,
    basket: persistedBasketReducer,
    order: orderReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    productPage: productPageReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;