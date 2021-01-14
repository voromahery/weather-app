import React, { useState } from "react";

export default function SearchForm({
  setSearchTitle,
  searchTitle,
  dataByCity,
  setCity,
}) {

// Search by clicking the searching result
  function searchByClick(e) {
    setCity(e.target.value);
    console.log(e.target.value);
  }

  // Searching by city name
  function searchCity(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setCity(form.search.value);
    form.reset();
  }

  console.log(dataByCity, searchTitle);
  return (
    <div>
      <form onSubmit={searchCity}>
        <input type="text" name="search" onChange={(e) => e.target.value} />
        <button>Search</button>
      </form>
      <div>
        {searchTitle.map((data) => (
          <button key={data.woeid} value={data.title} onClick={searchByClick}>
            {data.title}
          </button>
        ))}
      </div>
    </div>
  );
}
