import React from 'react';
import { Clock, Folder, Tv } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import MovieCard from '../components/MovieCard';

const Home = ({ movies, categories, onMovieClick, onCategoryClick }) => {
  return (
    <div className="container" style={{ paddingBottom: '1.5rem', paddingTop: '1rem' }}>
      <div style={{ backgroundColor: '#fef9c3', borderLeft: '4px solid #eab308', color: '#a16207', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
        <p style={{ fontWeight: 'bold' }}>Latest Updates:</p>
        <p>• Pathaan (2023) HD-Rip Added.</p>
        <p>• Stranger Things S4 Hindi Dubbed Available now.</p>
        <p>• Please use our new domain if this one is blocked!</p>
      </div>

      <SectionHeader title="Latest Uploads" icon={Clock} />
      <div className="grid-2">
        {movies.slice(0, 6).map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>

      <SectionHeader title="Movie Categories" icon={Folder} />
      <div className="cat-container">
        <div className="cat-grid">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => onCategoryClick(cat.name)} className="cat-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Folder size={16} color="#ea580c" />
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#e5e7eb' }}>{cat.name}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({cat.count})</span>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader title="Trending Web Series" icon={Tv} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
        {movies.filter(m => m.category === "Web Series").map(movie => (
          <div key={movie.id} onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
            <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', borderRadius: '4px', border: '1px solid #374151' }}>
               <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#ea580c', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '0.1rem 0.5rem', borderBottomLeftRadius: '4px' }}>HD</div>
            </div>
            <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem', color: '#d1d5db', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;