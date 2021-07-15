import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuApi from "../../../../API/MenuApi";
import { getAllProduct } from "../../../../APP/listFoodSlice";

export const actionDelete = createAsyncThunk('MenuDelete',async (params, thunkApi) => {
    const res = await MenuApi.deleteProduct(params);
    return res;
})

const Menu = createSlice({
    name: 'delete-repair',
    initialState: {
        data: {},
        loading: false,
        err: ''
    },
    extraReducers: {
        [actionDelete.pending]:state=>{
            state.loading=true;
        },
        [actionDelete.rejected]:(state, action)=>{
            state.loading=false;
            state.err = action.error;
        },
        [actionDelete.fulfilled]:(state, action)=>{
            state.loading=false;
            state.data=action.payload;
        }
    }
})

const {reducer:DeleteRepair} = Menu;

export default DeleteRepair;