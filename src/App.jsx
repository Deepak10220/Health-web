import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Gym from './Components/Gym';
import Exercise from './Components/Exercise';

function App() {
  const [data, setData] = useState([]); // State to hold the fetched exercise data
  const [limit, setLimit] = useState(10); // State to manage the limit of fetched exercises
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered exercise data
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Function to fetch exercise data from the API
  const fetchExerciseData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        params: { limit: limit },
        headers: {
          'X-RapidAPI-Key': 'a030b08041msh4b96922e0ba3348p190f4cjsn7f79defc66b0',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching exercise data:', error);
    }
    setLoading(false);
  };

  // Fetch exercise data when limit changes
  useEffect(() => {
    fetchExerciseData();
  }, [limit]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter exercise data based on search term
  useEffect(() => {
    const filtered = data.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.target.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  return (
    <div>
      <Gym />
      <div className="input">
        <h1>Exercise List</h1>
        <input
          type="text"
          placeholder="Search by target, body part, exercise"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="exercise">
        { 
          // <p>Loading...</p>
         filteredData.length > 0 ? (
          filteredData.map((exercise, index) => (
            <Exercise
              key={index}
              img={exercise.gifUrl}
              bodyPart={exercise.bodyPart}
              target={exercise.target}
              name={exercise.name}
              limit={limit}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      <button
        className="loadbutton"
        onClick={() => {
          setLimit((prevLimit) => prevLimit + 10);
        }}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
