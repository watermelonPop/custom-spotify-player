import { createSlice } from "@reduxjs/toolkit";
import defaultTheme from "./defaultTheme";
import strawberryTheme from "./strawberryTheme";
import pjTheme from "./pjTheme";
import tteokTheme from "./tteokTheme";
import ambTheme from "./ambTheme";
import earthTheme from "./earthTheme";
import customTheme from "./customTheme";
import sunsetTheme from "./sunsetTheme";

const initialState = {
  themes: [defaultTheme, strawberryTheme, pjTheme, tteokTheme, ambTheme, earthTheme, sunsetTheme, customTheme],
  currentThemeIndex: parseInt(localStorage.getItem("currentThemeIndex")) || 0,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const selectedThemeIndex = action.payload;

      if (selectedThemeIndex >= 0 && selectedThemeIndex < state.themes.length) {
        state.currentThemeIndex = selectedThemeIndex;
        localStorage.setItem("currentThemeIndex", selectedThemeIndex.toString()); // Save to local storage
      } else {
        console.warn(`Invalid theme index: ${selectedThemeIndex}`);
      }
    },
  },
});

export const asyncSetTheme = (selectedThemeIndex) => (dispatch, getState) => {
  const currentState = getState();
  const themeIndex = parseInt(localStorage.getItem("currentThemeIndex"));
  if (themeIndex >= 0 && themeIndex < currentState.themes.length) {
    currentState.currentThemeIndex = selectedThemeIndex;
    localStorage.setItem("currentThemeIndex", selectedThemeIndex.toString()); // Save to local storage
    console.log("local: " + localStorage.getItem("currentThemeIndex"));
    console.log("trying: " + selectedThemeIndex.toString());
  } else {
    console.warn(`Invalid theme index: ${selectedThemeIndex}`);
  }
  dispatch(setTheme(selectedThemeIndex));
};

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;