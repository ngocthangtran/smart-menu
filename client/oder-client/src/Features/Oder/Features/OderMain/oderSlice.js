import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import oderApi from '../../oderApi';

export const addProductAction = createAsyncThunk('addProducAtTable', async (params, thunkApi) => {
    const res = await oderApi.addProduct(params)
    return res;
})

const oderSlide = createSlice({
    name: 'oderSlice',
    initialState: {
        keyTable: '',
        res: ''
    },
    extraReducers: {
        [addProductAction.fulfilled]: (state, action) => {
            state.res = action.payload
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