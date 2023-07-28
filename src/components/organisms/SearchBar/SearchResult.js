import React from 'react';

const SearchResult = ({ location }) => {
  const searchResults = location.state.searchResults || [];

  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
