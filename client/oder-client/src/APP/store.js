import { configureStore } from "@reduxjs/toolkit";
import allfood from "./listFoodSlice";
import addFood from "../Features/Admin/Features/Menu/AddProduct/addFood";

const rootReducer = {
    "allfood": allfood,
    "addfood": addFood
}
const store = configureStore({
    reducer: rootReducer
})

export default store;