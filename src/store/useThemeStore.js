// src/stores/themeStore.js

import { create } from "zustand";

// Get the initial theme from localStorage or default to 'lofi'
 

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("app-theme") || "night",
  setTheme: (newTheme) => {
    localStorage.setItem("app-theme", newTheme);
    set({ theme: newTheme });
  },
}));