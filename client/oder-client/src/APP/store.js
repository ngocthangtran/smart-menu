import { configureStore } from "@reduxjs/toolkit";
import allfood from "./listFoodSlice";
import addFood from "../Features/Admin/Features/Menu/AddProduct/addFood";
import DeleteRepair from "../Features/Admin/Features/Menu/MenuSlide";
import AllDrink from './listDrinks';
import oderOption from "../Features/Admin/Features/Menu/Card/oderOptionSlice";
import oderReducer from '../Features/Oder/Features/OderMain/oderSlice';
const rootReducer = {
    "allfood": allfood,
    "addfood": addFood,
    'alldrinks': AllDrink,
    "deleterepair": DeleteRepair,
    'oderoption': oderOption,
    "oderReducer": oderReducer
}
const store = configureStore({
    reducer: rootReducer
})

export default store;