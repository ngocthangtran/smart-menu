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
        error: ''
    },
    reducers: {
        deleteAFood: (state, action) => {
            const foodCategory = {...state.data[action.payload.category]};
            delete foodCategory[action.payload.key];
            state.data = {...state.data, [action.payload.category]:foodCategory}

            // const a = { ...state.data[action.payload.category] }
            // delete a[action.payload.key]
            // state.data = { ...state.data, [action.payload.category]: a }
        }
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
export const { deleteAFood } = actions;
export default getAllReducer;
