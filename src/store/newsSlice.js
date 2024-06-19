import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    favorites: JSON.parse(localStorage.getItem('liked')) || [],
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites = [action.payload, ...state.favorites];
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites?.filter(item => item.id !== action.payload)
        },
    }
})

// save favorites to local storage
export const saveFavoritesToLocalStorage = store => next => action => {
    const result = next(action);
    if (action.type.startsWith('news/')) {
        const state = store.getState();
        localStorage.setItem('liked', JSON.stringify(state.favorites));
    }
    return result;
}

export const { addFavorite, removeFavorite } = newsSlice.actions
export default newsSlice.reducer