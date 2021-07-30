import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import oderApi from '../../oderApi';

export const addProductAction = createAsyncThunk('addProducAtTable', async (params, thunkApi) => {
    const res = await oderApi.addProduct(params)
    return res;
})

const oderSlide = createSlice({
    name: 'oderSlice',
    initialState: {
        keyTable: '-McEm9sL4p5yHByBiNpB',
        res: ''
    },
    extraReducers: {
        [addProductAction.fulfilled]: (state, action) => {
            state.res = action.payload
        }
    }
})

const { reducer: oderReducer } = oderSlide
export default oderReducer