import React from 'react';
import { ChevronRight } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => (
  <div onClick={() => onClick(movie)} className="movie-list-item">
    <div className="movie-thumb">
      <img src={movie.poster} alt={movie.title} />
    </div>
    <div className="movie-info">
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-meta">{movie.year} • {movie.language}</p>
      <p className="movie-meta" style={{ marginTop: '0.25rem' }}>{movie.category}</p>
    </div>
    <div style={{ alignSelf: 'center' }}>
      <ChevronRight size={16} color="#4b5563" />
    </div>
  </div>
);

export default MovieCard;
