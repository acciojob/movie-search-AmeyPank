import React, { useState } from 'react';

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Invalid movie name. Please try again.');
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=e6417e97&s=${searchQuery}`);
      const data = await response.json();

      if (data.Response === 'False') {
        setError(data.Error);
        setMovies([]);
      } else {
        setError('');
        setMovies(data.Search);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setMovies([]);
    }
  };

  return (
    
        <form>
        <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter a movie name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
        </form>
      
  );
};

export default Searchbar;
