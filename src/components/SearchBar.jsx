import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call onSearch directly with the new query
  };

  return (
    <form className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange} // Call handleChange on input change
        className="p-2 w-full max-w-md border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Remove the submit button for instant search */}
    </form>
  );
};

export default SearchBar;
