import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function SearchBar(props) {
  const items = props.authors.map((p, i) => {
      return {id: i, name: p.displayName}
  });

  const handleOnSelect = (item) => {
    // the item selected
    const author = props.authors[item.id];
    props.follow(author);
  }

  return (
    <div className="Search-bar">
      <div style={{ width: 400 }}>
        <ReactSearchAutocomplete
          items={items}
          onSelect={handleOnSelect}
          autoFocus
        />
      </div>
    </div>
  );
}

export default SearchBar;