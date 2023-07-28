// pages/search.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: '/search',
      query: { q: searchQuery }, // Pass the search query as a URL query parameter
    });
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Enter your search query..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
