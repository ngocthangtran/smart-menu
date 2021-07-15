import { configureStore } from "@reduxjs/toolkit";
import allfood from "./listFoodSlice";
import addFood from "../Features/Admin/Features/Menu/AddProduct/addFood";
import DeleteRepair from "../Features/Admin/Features/Menu/MenuSlide";

const rootReducer = {
    "allfood": allfood,
    "addfood": addFood,
    "deleterepair": DeleteRepair,
}
const store = configureStore({
    reducer: rootReducer
})

export default store;