import { useState } from "react"; 


const SearchBar = ({ onSearch }) => {
 
  const [query, setQuery] = useState("");

 
  const handleChange = (e) => {
    const newQuery = e.target.value; // Hämtar det nya värdet från inputfältet
    setQuery(newQuery); // Uppdaterar lokal state med det nya värdet
    onSearch(newQuery); // Anropar callback-funktionen onSearch och skickar med den uppdaterade sökfrågan
  };

  return (
    
    <form className="flex justify-center my-4">
  
      <input
        type="text" 
        placeholder="Search for movies..." 
        value={query} // Binder inputfältets värde till lokal state
        onChange={handleChange} // Anropar handleChange när användaren skriver något
        className="p-2 w-full max-w-md border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </form>
  );
};

export default SearchBar;
