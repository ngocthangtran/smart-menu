import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuApi from "../../../../API/MenuApi";
import { getAllProduct } from "../../../../APP/listFoodSlice";

export const actionRemove = createAsyncThunk('MenuDelete',async (params, thunkApi) => {
    
    const res = await MenuApi.deleteProduct(params);
    return res;
})

export const actionRepairData = createAsyncThunk('MenuRepair', async(params, thunkApi)=>{
    const res = await MenuApi.repairProduct(params);
    return res
})

const Menu = createSlice({
    name: 'delete-repair',
    initialState: {
        res: {},
        loading: false,
        err: ''
    },
    extraReducers: {
        [actionRemove.pending]:state=>{
            state.loading=true;
        },
        [actionRemove.rejected]:(state, action)=>{
            state.loading=false;
            state.err = action.error;
        },
        [actionRemove.fulfilled]:(state, action)=>{
            state.loading=false;
            state.res=action.payload;
        },
        [actionRepairData.pending]:state=>{
            state.loading=true;
        },
        [actionRepairData.rejected]:(state, action)=>{
            state.loading=false;
            state.err = action.error;
        },
        [actionRepairData.fulfilled]:(state, action)=>{
            state.loading=false;
            state.res=action.payload;
        }
    }
})

const {reducer:DeleteRepair} = Menu;

export default DeleteRepair;