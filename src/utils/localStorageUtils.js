// Spara Redux-tillståndet till localStorage
export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state); // Serialisera hela tillståndet till en JSON-sträng
    localStorage.setItem("reduxState", serializedState); // Använd en enda nyckel för att lagra hela tillståndet
  } catch (err) {
    console.error("Kunde inte spara tillstånd", err); 
  }
};

// Ladda Redux-tillståndet från localStorage
export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState"); // Ladda hela tillståndet från localStorage
    if (serializedState === null) {
      // Returnera ett giltigt initialt tillstånd med tomma items-arrayer för både favoriter och betyg
      return {
        favorites: { items: [] }, // Tom lista för favoriter
        ratings: { ratings: {} }, // Tomt objekt för betyg
      };
    }
    return JSON.parse(serializedState); // Parsar och returnerar det sparade tillståndet
  } catch (err) {
    console.error("Kunde inte ladda tillstånd", err); // Logga felmeddelande om det inte går att ladda
    // Returnera ett giltigt initialt tillstånd om det uppstår ett fel
    return {
      favorites: { items: [] }, // Tom lista för favoriter
      ratings: { ratings: {} }, // Tomt objekt för betyg
    };
  }
};
