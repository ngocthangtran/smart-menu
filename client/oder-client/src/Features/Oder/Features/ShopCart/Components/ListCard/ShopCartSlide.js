import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import oderApi from "../../../../oderApi";

export const removeFoodAction = createAsyncThunk('ShopCartSlide-remove', async (params, thunkApi) => {
    const res = await oderApi.removeProduct(params);
    return res;
})

export const quantityChangeFood = createAsyncThunk('ShopCartSlide-change', async (params, thunkApi) => {
    const res = await oderApi.quantityChange(params);
    return res;
})
const ShopCartSlide = createSlice({
    name: 'ShopCartSlide',
    initialState: {
        res: {},
        loading: false,
        error: ''
    },
    extraReducers: {
        [removeFoodAction.fulfilled]: (state, action) => {
            state.loading = false
            state.res = action.payload
        },
        [removeFoodAction.rejected]: (state, action) => {
            state.loading = true
            state.error = action.error
        },
        [removeFoodAction.pending]: (state) => {
            state.loading = true
        },
        [quantityChangeFood.fulfilled]: (state, action) => {
            state.res = action.payload;
            state.loading = false
        }
    }
})

const { reducer: shopCart } = ShopCartSlide;
export default shopCart