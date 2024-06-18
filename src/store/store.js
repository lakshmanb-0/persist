import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './newsSlice'

const store = configureStore({
    reducer: newsReducer
})

export default store;