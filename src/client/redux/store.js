import { configureStore } from '@reduxjs/toolkit';
import { expenseReducer } from './expenseReducer.js';

const store = configureStore({
    reducer: {
        expenses: expenseReducer,
    }
})

export default store;