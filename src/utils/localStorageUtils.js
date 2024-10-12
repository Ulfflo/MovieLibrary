// localStorageUtils.js

// Save Redux state to localStorage
export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favorites", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Load Redux state from localStorage
export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) {
      return undefined; // No saved state, return undefined to use initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};
