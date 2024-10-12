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
      // Return a valid initial state with an empty items array
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    // Return a valid initial state with an empty items array if there's an error
    return { items: [] };
  }
};
