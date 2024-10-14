

describe("Movie Favorites and Rating Tests", () => {
  // Test 1: Favorite functionality
  describe("Favorite a movie", () => {
    it("should allow a user to add and remove a movie from favorites", () => {
      // Visit the movie details page
      cy.visit("/movies/1184918"); // Replace with the actual movie ID or path in your app

      // Check if the movie title is displayed
      cy.get("h1").contains("The Wild Robot"); // Adjust the title to match the movie

      // Click on "Add to Favorites"
      cy.get("button").contains("Add to Favorites").click();

      // Check that the button now says "Remove from Favorites"
      cy.get("button").contains("Remove from Favorites");

      // Navigate to the favorites page
      cy.visit("/favorites");

      // Verify the movie is listed in favorites
      cy.get("h3").contains("The Wild Robot");

      // Click "Remove" to remove it from favorites
      cy.get("button").contains("Remove").click();

      // Ensure the movie is no longer in the favorites list
      cy.get("h3").should("not.exist");
    });
  });

  // Test 2: Rating functionality
  describe("Rate a movie", () => {
    it("should allow a user to rate a movie", () => {
      // Visit the movie details page
      cy.visit("/movies/823219"); // Replace with the actual movie ID or path in your app

      // Check if the movie title is displayed
      cy.get("h1").contains("Flow"); // Adjust the title to match the movie

      // Click on the 3rd star to set a rating of 3
      cy.get(".cursor-pointer").eq(2).click(); // Assuming stars are represented by this class

      // Verify that the 3 stars are now yellow (or the selected color)
      cy.get(".cursor-pointer").eq(0).should("have.class", "text-yellow-500");
      cy.get(".cursor-pointer").eq(1).should("have.class", "text-yellow-500");
      cy.get(".cursor-pointer").eq(2).should("have.class", "text-yellow-500");

      // Reload the page to check that the rating persists
      cy.reload();

      // Verify that the rating is still applied after the reload
      cy.get(".cursor-pointer").eq(2).should("have.class", "text-yellow-500");
    });
  });
});
