
const Rating = ({ rating, onRatingChange }) => {
  return (
  
    <div className="flex items-center mb-2">
      {/* Skapar en array med 5 element och mappar över den för att skapa stjärnorna */}
      {Array(5)
        .fill(0) // Fyller arrayen med 0:or som placeholders
        .map((_, index) => (
          // Varje stjärna renderas som ett <span>-element
          <span
            key={index} // Nyckel för varje stjärna baserat på dess index
            className={`cursor-pointer ${
              index < rating ? "text-yellow-500" : "text-gray-300" // Om stjärnans index är mindre än betyget, färgas den gul, annars grå
            }`}
            onClick={() => onRatingChange(index + 1)} // Vid klick, sätts det nya betyget genom att skicka index + 1 till callback-funktionen
          >
            ★
          </span>
        ))}
    </div>
  );
};

export default Rating;
