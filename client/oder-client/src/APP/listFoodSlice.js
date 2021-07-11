import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ListFoodAPI from '../API/listFoodApi';

export const getAllProduct = createAsyncThunk('ListFood/getAllProduct', async (prams, thunkAPI) => {
    const ListProduct = await ListFoodAPI.getAll();
    return ListProduct;
})

const listFoodSlice = createSlice({
    name: 'listfood',
    initialState: {
        data: {},
        loading: false,
        error: ''
    },
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.loading = true
        },
        [getAllProduct.fulfilled]: (state, actions) => {
            state.loading = false;
            state.data = actions.payload;
        },
        [getAllProduct.rejected]: (state, actions) => {
            state.loading = false;
            state.error = { message: 'Không thể tải sản phẩm hoặc không có sản phẩm nào' };
        },
    }
})

const { reducer: getAllReducer } = listFoodSlice;
export default getAllReducer;