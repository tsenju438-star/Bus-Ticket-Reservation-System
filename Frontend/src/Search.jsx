import React, { useState } from 'react'
import SearchRes from './SearchRes'
import './Search.css'

function Search() {

  let [state,setState]=useState([])
  let [stage,setStage]=useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const source = formData.get("source");
    const destination = formData.get("destination");
    const travelDate = formData.get("td");

    console.log(source, destination, travelDate);

    try {
      const response = await fetch(
        "http://localhost:8080/api/buses/search?source=" +
          source +
          "&destination=" +
          destination +
          "&seats=1",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setState(data)
      setStage(true);

    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  return (
    <div>
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <section>
          <label>From</label>
          <input type="text" name="source" placeholder="📍 Source" required />
        </section>

        <section>
          <label>To</label>
          <input type="text" name="destination" placeholder="📍 Destination" required />
        </section>

        <section>
          <label>Travel Date</label>
          <input type="date" name="td" required />
        </section>

        <section className='searchbut'>
          <button type="submit">🔎 Search</button>
        </section>
      </form>
      
    </div>
      {
        stage &&
        <SearchRes buses={state}></SearchRes>
      }
    </div>
  );
}

export default Search;