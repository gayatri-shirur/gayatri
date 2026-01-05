import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  isPinned: false,
  hasAutoHidden: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    showSidebar: (state) => {
      state.isVisible = true;
    },
    hideSidebar: (state) => {
      if (!state.isPinned) {
        state.isVisible = false;
      }
    },
    toggleSidebar: (state) => {
      state.isVisible = !state.isVisible;
      state.isPinned = state.isVisible; // Pin when opened, unpin when closed
    },
    pinSidebar: (state) => {
      state.isPinned = true;
      state.isVisible = true;
    },
    unpinSidebar: (state) => {
      state.isPinned = false;
    },
    setAutoHidden: (state) => {
      state.hasAutoHidden = true;
      if (!state.isPinned) {
        state.isVisible = false;
      }
    },
  },
});

export const {
  showSidebar,
  hideSidebar,
  toggleSidebar,
  pinSidebar,
  unpinSidebar,
  setAutoHidden,
} = sidebarSlice.actions;

// Selectors
export const selectSidebarVisible = (state) => state.sidebar.isVisible;
export const selectSidebarPinned = (state) => state.sidebar.isPinned;
export const selectHasAutoHidden = (state) => state.sidebar.hasAutoHidden;

export default sidebarSlice.reducer;
