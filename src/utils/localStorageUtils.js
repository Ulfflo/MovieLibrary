// Save Redux state to localStorage
export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state); // Serialize the entire state
    localStorage.setItem("reduxState", serializedState); // Use a single key for the entire state
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Load Redux state from localStorage
export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState"); // Load the entire state
    if (serializedState === null) {
      // Return a valid initial state with empty items arrays for both favorites and ratings
      return {
        favorites: { items: [] },
        ratings: { ratings: {} },
      };
    }
    return JSON.parse(serializedState); // Parse and return the state
  } catch (err) {
    console.error("Could not load state", err);
    // Return a valid initial state if there's an error
    return {
      favorites: { items: [] },
      ratings: { ratings: {} },
    };
  }
};

