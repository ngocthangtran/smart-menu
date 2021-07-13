import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuApi from "../../../../../API/MenuApi";

export const addfood = createAsyncThunk('addfood', async (params, thunkAPI) => {
    
    const data = await MenuApi.addProduct(params)
    return data
})

const addFood = createSlice({
    name: 'addfood',
    initialState: {
        data: {},
        loading: false,
        error: ''
    },
    extraReducers: {
        [addfood.pending]:(state)=>{
            state.loading=true;
        },
        [addfood.rejected]:(state, action)=>{
            state.loading=false;
            state.error = action.error;
        },
        [addfood.rejected]:(state, actions)=>{
            state.loading=false;
            state.data = actions.payload;
        },
    }
})
const {reducer:addAFood} = addFood;
export default addAFood;