import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    favorites: [],
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites = [...state.favorites, action.payload];
            localStorage.setItem('liked', JSON.stringify(state.favorites))
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload)
            localStorage.setItem('liked', JSON.stringify(state.favorites))
        },
        localToState: (state, action) => {
            state.favorites = action.payload
        }
    }
})

export const { addFavorite, removeFavorite, localToState } = newsSlice.actions
export default newsSlice.reducer