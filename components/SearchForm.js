import React from 'react'

export default function SearchForm({searchCity}) {
    
    return (
        <div>
            <input type="text" onChange={searchCity} />
            <button>Search</button>
        </div>
    )
}
