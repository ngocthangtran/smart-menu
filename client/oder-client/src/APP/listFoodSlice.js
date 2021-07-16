import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ListFoodAPI from '../API/MenuApi';

export const getAllProduct = createAsyncThunk('ListFood/getAllProduct', async (prams, thunkAPI) => {
    const ListProduct = await ListFoodAPI.getAll();
    return ListProduct;
})

const listFoodSlice = createSlice({
    name: 'listfood',
    initialState: {
        data: {},
        loading: false,
        error: '',
        selectFood: null
    },
    reducers: {
        deleteAFood: (state, action) => {
            const foodCategory = { ...state.data[action.payload.category] };
            delete foodCategory[action.payload.key];
            state.data = { ...state.data, [action.payload.category]: foodCategory }
        },
        repairData: (state, action) => {
            const foodCategory = { ...state.data[action.payload.category], [action.payload.key]: action.payload.newData };

            state.data = { ...state.data, [action.payload.category]: foodCategory }
        },
        getKeyFood: (state, action) => {
            state.selectFood = { ...state.data[action.payload.category][action.payload.key], key: action.payload.key }
        },
        clearSelectFood: (state) => {
            state.selectFood = null
        },

    },
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.loading = true
        },
        [getAllProduct.fulfilled]: (state, actions) => {
            state.loading = false;
            state.data = actions.payload
        },
        [getAllProduct.rejected]: (state, actions) => {
            state.loading = false;
            state.error = { message: 'Không thể tải sản phẩm hoặc không có sản phẩm nào' };
        },
    }
})

const { reducer: getAllReducer, actions } = listFoodSlice;
export const { deleteAFood, getKeyFood, clearSelectFood, repairData } = actions;
export default getAllReducer;
