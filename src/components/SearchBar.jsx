import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function SearchBar(props) {
  const items = props.authors.map((p, i) => {
      return {id: i, name: p.displayName}
  });

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  }

  return (
    <div className="Search-bar">
      <div style={{ width: 400 }}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          autoFocus
        />
      </div>
    </div>
  );
}

export default SearchBar;