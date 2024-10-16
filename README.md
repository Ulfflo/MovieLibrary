# The Movie Library

Detta projekt är ett film-bibliotek byggt med React, Redux och TMDb API. Användare kan bläddra bland populära filmer, se detaljerad information om individuella filmer, söka efter filmer, betygsätta dem och lägga till eller ta bort favoriter.


## Innehållsförteckning

Funktioner

Projektstruktur

Installation

Användning

Teknologier

TMDb API-integration

State-hantering

Local Storage-integration

Versionshantering med Git

Teknisk SEO och Responsiv Design

Spårning och Analys

E2E-tester


## Funktioner

Bläddra bland en lista över populära filmer hämtade från TMDb API.

Sök efter filmer med hjälp av en sökfunktion med debounce-funktion för att minska API-anrop.

Visa detaljerad information om en specifik film, inklusive regissör, huvudrollsinnehavare och synopsis.

Betygsätt filmer och spara betyg.

Lägg till eller ta bort filmer från en favoritlista som lagras lokalt i webbläsaren.

Generera och hantera dynamiska sitemaps med data från TMDb API för SEO-optimering.

Google Tag Manager (GTM)-integration för att spåra användarinteraktioner (som att 
lägga till/ta bort favoriter).

E2E-tester för att säkerställa att appen fungerar som förväntat.


## Projektstruktur

/src/pages: Innehåller React-komponenter för olika sidor; HomePage, MovieDetails och FavoritesPage.

/src/components: Återanvändbara UI-komponenter; NavigationMenu, SearchBar, MovieList, Button och Rating.

/src/redux: Redux-store-konfiguration, actions, reducers och slices; movieSlice, movieDetailsSlice, favoritesSlice, och ratingsSlice.

/src/utils: Hjälpfil för funktioner; sitemap-generering och localStorage-hantering.

/cypress/e2e: End-to-End tester för att validera appens funktionalitet.

### Viktiga filer:

App.js: Huvudfilen som hanterar routing och integrering av Redux store och GTM.

redux/store.js: Konfigurerar Redux store och synkroniserar state med localStorage.

sitemap.js: Genererar en dynamisk sitemap baserat på statiska och dynamiska routes.

cypress/e2e/movie-favorites-and-rating.cy.js: E2E-tester som täcker två olika användarscenarion.


## Installation och körning

### Förutsättningar:
  
Node.js (version 14 eller högre)
npm 

### Installationssteg:

1. Klona detta repo:

  git clone https://github.com/Ulfflo/MovieLibrary

2. Navigera till projektets mapp:

  cd hemmakvalls-filmbibliotek

3. Installera beroenden:

  npm install

4. Kör applikationen lokalt:

  npm run dev

Applikationen kommer att vara tillgänglig på http://localhost:5173.


## Användning

Besök hemsidan för att se en lista över populära filmer.
Använd sökfältet för att söka efter specifika filmer.
Klicka på en film för att se detaljerad information om den.
Betygsätt filmer och spara dem lokalt.
Lägg till eller ta bort filmer från din favoritlista.


## Teknologier

React – Frontend-ramverket som hanterar användargränssnittet.
Tailwind CSS: För styling och responsiv design.
Redux Toolkit – För state-hantering genom hela appen.
React Router – För routing mellan sidorna.
TMDb API – För att hämta populära filmer och information om individuella filmer.
Google Tag Manager – För att spåra användarinteraktioner.
Cypress – End-to-end testverktyg för att säkerställa funktionaliteten hos favorit- och betygsfunktionerna.


## TMDb API-integration

Appen använder TMDb API för att hämta information om populära filmer och detaljer om enskilda filmer. API-anrop hanteras asynkront, och följande API-anrop görs:

Populära filmer: Hämtas från slutpunkten /movie/popular.
Filmdetaljer: Hämtas dynamiskt baserat på film-ID.


## State-hantering

State hanteras med Redux och är uppdelad i olika slices för filmer, favoriter, betyg och individuella filmuppgifter.

För att synkronisera state med localStorage används hjälpfunktionerna saveStateToLocalStorage och loadStateFromLocalStorage:

Spara state till localStorage: Funktionen saveStateToLocalStorage sparar hela Redux-state som en sträng i localStorage.

Ladda state från localStorage: Funktionen loadStateFromLocalStorage laddar state från localStorage, inklusive listan över favoriter och betyg.


## Local Storage-integration

För att spara användarens favoritfilmer och betyg används localStorage. Detta gör att data kan sparas även om sidan laddas om.

Favoriter och betyg sparas i localStorage genom saveStateToLocalStorage-funktionen.
Vid sidladdning hämtas dessa värden med loadStateFromLocalStorage.


## Versionshantering med Git

Projektet följer en strukturerad versionshantering med Git. Minst fem commits och användning av branching för att hantera nya funktioner.


## Teknisk SEO och Responsiv Design

Applikationen har optimerats för sökmotorer genom att inkludera relevanta metataggar och en sitemap. Dessutom är sidan mobilvänlig och anpassad för alla skärmstorlekar genom användning av Tailwind CSS.

robots.txt: Tillåter alla bots att indexera.
sitemap.xml: Genereras för att underlätta för sökmotorer att indexera viktiga sidor som filmvisningar och favoritsidor.


## Spårning och Analys

Google Analytics och Google Tag Manager har implementerats för att spåra användarinteraktioner. En händelse spåras när en film läggs till eller tas bort från favoriter.


## E2E-tester

För att säkerställa att applikationen fungerar som förväntat används Cypress för End-to-End (E2E) tester. Dessa tester simulerar användarinteraktioner och validerar att applikationen beter sig korrekt i olika scenarion.
