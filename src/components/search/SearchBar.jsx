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


  // Searchbar Default values:
  // {
  //   height: "44px",
  //   border: "1px solid #dfe1e5",
  //   borderRadius: "24px",
  //   backgroundColor: "white",
  //   boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
  //   hoverBackgroundColor: "#eee",
  //   color: "#212121",
  //   fontSize: "16px",
  //   fontFamily: "Arial",
  //   iconColor: "grey",
  //   lineColor: "rgb(232, 234, 237)",
  //   placeholderColor: "grey",
  // };

  return (
    <div style={{ width: "100%"}}>
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        maxResults={5}
        styling={{borderRadius: "6pt"}}
      />
    </div>
  );
}

export default SearchBar;