import { createSlice } from '@reduxjs/toolkit';
import { getFlavor, getAvailableFlavors } from '../flavors.js';

const initialState = {
  currentTheme: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const themeName = action.payload;
      const availableThemes = getAvailableFlavors();
      if (availableThemes.includes(themeName)) {
        state.currentTheme = themeName;
        localStorage.setItem('theme', themeName);
      }
    },
    toggleTheme: (state, action) => {
      const themeName = action.payload;
      const availableThemes = getAvailableFlavors();
      if (availableThemes.includes(themeName)) {
        state.currentTheme = themeName;
        localStorage.setItem('theme', themeName);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Selector to get the theme object
export const selectTheme = (state) => getFlavor(state.theme.currentTheme);
export const selectCurrentTheme = (state) => state.theme.currentTheme;

export default themeSlice.reducer;
