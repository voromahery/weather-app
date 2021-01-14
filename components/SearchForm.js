import React from "react";

export default function SearchForm({
  searchCity,
  searchTitle,
  setSearchTitle,
  dataByCity,
  setDataByCity,
}) {
    
  function searchByClick(e) {
    setDataByCity(e.target.value);
    console.log(e.target.value);
  }

  console.log(dataByCity);
  return (
    <div>
      <input type="text" onChange={searchCity} />
      <button>Search</button>
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
