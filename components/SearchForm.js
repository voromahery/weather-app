import React, { useState } from "react";
import rightIcon from "../icons/right-icon.svg";
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
    <div className="search-form-wrapper">
      <form onSubmit={searchCity} className="search-form">
        <input
          type="text"
          name="search"
          className="search-field"
          onChange={(e) => e.target.value}
          placeholder="search location"
        />
        <button className="search-button">Search</button>
      </form>
      <ul className="search-result-list">
        {searchTitle.map((data) => (
          <li key={data.woeid}>
            <button
              className="search-value"
              value={data.title}
              onClick={searchByClick}
            >
              <span>{data.title}</span>
              <img src={rightIcon} alt="" className="right-icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
