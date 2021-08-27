import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import oderApi from '../../oderApi';

export const addProductAction = createAsyncThunk('addProducAtTable', async(params, thunkApi) => {
    const res = await oderApi.addProduct(params)
    return res;
})

const oderSlide = createSlice({
    name: 'oderSlice',
    initialState: {
        keyTable: '',
        res: '',
        loading: false
    },
    extraReducers: {
        [addProductAction.fulfilled]: (state, action) => {
            state.res = action.payload
            state.loading = false
        },
        [addProductAction.pending]: (state, action) => {
            state.loading = true
        }
    },
    reducers: {
        addKeyTable: (state, action) => {
            state.keyTable = action.payload;
        }
    }
})

const { reducer: oderReducer, actions } = oderSlide
export const { addKeyTable } = actions
export default oderReducer