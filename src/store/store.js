import { configureStore } from '@reduxjs/toolkit'
import newsReducer, { saveFavoritesToLocalStorage } from './newsSlice'

const store = configureStore({
    reducer: newsReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveFavoritesToLocalStorage)
})

export default store;