import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

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
      setError('Invalid movie name. Please try again.');
      setMovies([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a movie name"
        />
        <button type="submit">Search</button>
      </form>
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
    </div>
  );
};

export default SearchBar;
