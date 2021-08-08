import { createSlice } from "@reduxjs/toolkit";

const cartSlide = createSlice({
    name: 'shopcart',
    initialState: {
        amount: 0,
        dataOder: {},
        sumPrice: 0,
        dataTable: {}
    },

    reducers: {
        amount: (state, action) => {
            state.amount = action.payload
        },
        dataoder: (state, action) => {
            state.dataOder = action.payload
        },
        sumprice: (state, action) => {
            state.sumPrice = action.payload
        },
        addDataTable: (state, action) => {
            state.dataTable = action.payload
        }
    },
})

const { reducer: cartReducer, actions } = cartSlide;
export const { amount, dataoder, sumprice, addDataTable } = actions
export default cartReducer;