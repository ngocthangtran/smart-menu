import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableApi } from "./TableApi";

export const AddNewTable = createAsyncThunk('Table-Addnew', async (params, thunkApi) => {
    const res = await TableApi.addNew(params);
    return res
})

export const GetLastTable = createAsyncThunk('table-lasttable', async (params, thunkApi) => {
    const res = await TableApi.LastTable();
    return res;
})

export const checkTableExits = async(params) => {
    const res = await TableApi.checkTableExits(params)
    return res
}

const TableSlice = createSlice({
    name: 'TableSlide',
    initialState: {
        res: '',
        data: null,
        error: '',
        loading: false
    },
    extraReducers: {
        [AddNewTable.pending]: state => {
            state.loading = true;
        },
        [AddNewTable.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false;
        },
        [AddNewTable.fulfilled]: (state, action) => {
            state.res = action.payload
            state.loading = false
        },
        [GetLastTable.pending]: state => {
            state.loading = true;
        },
        [GetLastTable.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false;
        },
        [GetLastTable.fulfilled]: (state, action) => {
            state.res = action.payload.data
            state.loading = false
        }
    }
})

const { reducer: TablesReducer } = TableSlice;
export default TablesReducer