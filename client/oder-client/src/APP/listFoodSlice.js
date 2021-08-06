import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ListFoodAPI from '../API/MenuApi';

export const getAllProduct = createAsyncThunk('ListFood/getAllProduct', async (params, thunkAPI) => {
    const ListProduct = await ListFoodAPI.getAll(params);
    if (ListProduct) {
        return ListProduct;
    }
    return thunkAPI.rejectWithValue({
        status: 404,
        message: 'Không có sản phẩm nào'
    })
})

const listFoodSlice = createSlice({
    name: 'listfood',
    initialState: {
        dataFood: {},
        loading: false,
        error: '',
        selectFood: null
    },
    reducers: {
        deleteAFood: (state, action) => {
            const foodCategory = { ...state.dataFood[action.payload.category] };
            delete foodCategory[action.payload.key];
            state.dataFood = { ...state.dataFood, [action.payload.category]: foodCategory }
        },
        repairData: (state, action) => {
            const foodCategory = { ...state.data[action.payload.category], [action.payload.key]: action.payload.newData };
            console.log(foodCategory)
            state.dataFood = { ...state.dataFood, [action.payload.category]: foodCategory }
        },
        getKeyFood: (state, action) => {
            state.selectFood = { ...state.dataFood[action.payload.category][action.payload.key], key: action.payload.key }
        },
        clearSelectFood: (state) => {
            state.selectFood = null
        },
        addNewData: (state, action) => {
            const foodCategory = { ...state.dataFood[action.payload.category] };
            foodCategory[action.payload.key] = action.payload.newData;
            state.dataFood = { ...state.dataFood, [action.payload.category]: foodCategory }
        }

    },
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.loading = true
        },
        [getAllProduct.fulfilled]: (state, actions) => {
            state.loading = false;
            state.dataFood = actions.payload
        },
        [getAllProduct.rejected]: (state, actions) => {
            state.loading = false;
            state.error = { message: 'Không thể tải sản phẩm hoặc không có sản phẩm nào' };
        },
    }
})

const { reducer: getAllReducer, actions } = listFoodSlice;
export const { deleteAFood, getKeyFood, clearSelectFood, repairData, addNewData } = actions;
export default getAllReducer;
