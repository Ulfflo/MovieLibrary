describe("Tester för favoritfilmer och betyg", () => {
  // Test 1: Funktionalitet för att favoritisera filmer
  describe("Favorit av en film", () => {
    it("ska tillåta en användare att lägga till och ta bort en film från favoriter", () => {
      // Besök filmsidan
      cy.visit("/movies/1184918");

      // Kontrollera om filmtiteln visas
      cy.get("h1").contains("The Wild Robot");

      // Klicka på "Add to Favourites"
      cy.get("button").contains("Add to Favourites").click();

      // Kontrollera att knappen nu säger "Remove from Favourites"
      cy.get("button").contains("Remove from Favourites");

      // Navigera till favoritsidan
      cy.visit("/favorites");

      // Verifiera att filmen finns listad bland favoriter
      cy.get("h3").contains("The Wild Robot");

      // Klicka på "Remove" för att ta bort den från favoriter
      cy.get("button").contains("Remove").click();

      // Se till att filmen inte längre finns i listan över favoriter
      cy.get("h3").should("not.exist");
    });
  });

  // Test 2: Funktionalitet för att betygsätta filmer
  describe("Betygsätta en film", () => {
    it("ska tillåta en användare att betygsätta en film", () => {
      // Besök filmsidan
      cy.visit("/movies/823219"); 

      // Kontrollera om filmtiteln visas
      cy.get("h1").contains("Flow"); 

      // Klicka på den 3:e stjärnan för att sätta ett betyg på 3
      cy.get(".cursor-pointer").eq(2).click(); 

      // Verifiera att de 3 stjärnorna nu är gula
      cy.get(".cursor-pointer").eq(0).should("have.class", "text-yellow-500");
      cy.get(".cursor-pointer").eq(1).should("have.class", "text-yellow-500");
      cy.get(".cursor-pointer").eq(2).should("have.class", "text-yellow-500");

      // Ladda om sidan för att kontrollera att betyget finns kvar
      cy.reload();

      // Verifiera att betyget fortfarande är tillämpat efter omstart
      cy.get(".cursor-pointer").eq(2).should("have.class", "text-yellow-500");
    });
  });
});
