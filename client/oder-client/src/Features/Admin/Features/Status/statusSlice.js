import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableApi } from "../Table/TableApi";

export const getAllTableAction = createAsyncThunk('SatusSlide-getaddtable', async () => {
    const res = await TableApi.getAllTable();
    return res
})

const statuSlide = createSlice({
    name: "statuSlice",
    initialState: {
        statistic: '',
        listTable: [],//table in table
        tableOder: {}//table in odert
    },
    reducers: {
        setTableOder: (state, action) => {
            state.tableOder = action.payload;
        }
    }
    ,
    extraReducers: {
        [getAllTableAction.fulfilled]: (state, action) => {
            state.listTable = action.payload;
        }
    }
})

const { reducer: statusReducer, actions } = statuSlide
export const { setTableOder } = actions
export default statusReducer;