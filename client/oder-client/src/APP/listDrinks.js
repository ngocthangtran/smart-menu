import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MenuApi from "../API/MenuApi";

export const getDrinksAction = createAsyncThunk('all_drinks', async (params, thunkApi) => {
    const res = await MenuApi.getAll(params)
    if (res) {
        return res;
    }
    return thunkApi.rejectWithValue({
        status: 404,
        message: 'Không có sản phẩm nào'
    })
})

const DrinkSlice = createSlice({
    name: 'classify_drinks',
    initialState: {
        dataDrinks: {},
        loading: false,
        error: '',
        selectDrink: null
    },
    reducers: {
        deleteADrinks: (state, action) => {
            const foodCategory = { ...state.dataDrinks[action.payload.category] };
            delete foodCategory[action.payload.key];
            state.dataDrinks = { ...state.dataDrinks, [action.payload.category]: foodCategory }
        },
        getKeyDrink: (state, action) => {
            state.selectDrink = { ...state.dataDrinks[action.payload.category][action.payload.key], key: action.payload.key }
        },
        clearSelectDrink: (state) => {
            state.selectDrink = null
        },
    },
    extraReducers: {
        [getDrinksAction.pending]: state => {
            state.loading = true
        },
        [getDrinksAction.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getDrinksAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.dataDrinks = action.payload;
        }
    }
})

const { reducer: AllDrinks, actions } = DrinkSlice;
export const { deleteADrinks, getKeyDrink, clearSelectDrink } = actions
export default AllDrinks