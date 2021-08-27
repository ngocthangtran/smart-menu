import { createSlice } from "@reduxjs/toolkit";

const cartSlide = createSlice({
    name: 'shopcart',
    initialState: {
        amount: 0,
        dataOder: {},
        dataOderOld: [],
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
        },
        addDataOderOld: (state, action) => {
            state.dataOderOld = action.payload
        },
    },
})

const { reducer: cartReducer, actions } = cartSlide;
export const { amount, dataoder, sumprice, addDataTable, addDataOderOld } = actions
export default cartReducer;