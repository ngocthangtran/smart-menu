import { configureStore } from "@reduxjs/toolkit";
import allfood from "./listFoodSlice";

const rootReducer = {
    "allfood": allfood
}
const store = configureStore({
    reducer: rootReducer
})

export default store;