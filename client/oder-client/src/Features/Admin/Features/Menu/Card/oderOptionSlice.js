import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuApi from "../../../../../API/MenuApi";

export const oderOptionAction = createAsyncThunk('oderOption', async (params, thunkApi) => {
    const res = await MenuApi.oderOption(params);
    return res;
})

export const getAproduct = createAsyncThunk('getAproduct', async (params, thunkApi) => {
    const res = await MenuApi.getAproduct(params);
    return res;
})

const oderOptionSlice = createSlice({
    name: 'oderOptionSlice',
    initialState: {
        data: {},
        message: '',
        loading: false,
        error: ''
    },
    reducers: {
        addNewOption: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [oderOptionAction.pending]: state => {
            state.loading = true;
        },
        [oderOptionAction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [oderOptionAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload
        },
        [getAproduct.pending]: state => {
            state.loading = true;
        },
        [getAproduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getAproduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload
        },
    }
})

const { reducer: oderOption, actions } = oderOptionSlice;
export const { addNewOption } = actions;
export default oderOption;
