/* eslint-disable react-hooks/static-components */
import React, { useState } from 'react';
import "./App.css";

import { MOCK_DB, CATEGORIES } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails';
import MovieCard from './components/MovieCard'; // Re-used for list view
import SectionHeader from './components/SectionHeader'; // Re-used for list view
import { Folder, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Auth State
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 

  // Filter movies logic
  const getFilteredMovies = () => {
    if (currentView === 'search') {
      return MOCK_DB.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (currentView === 'category') {
      return MOCK_DB.filter(m => m.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
                                   (selectedCategory.includes(m.category))); 
    }
    return MOCK_DB;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setCurrentView('search');
  };

  const goToHome = () => {
    setCurrentView('home');
    setSearchQuery('');
    setSelectedMovie(null);
    setSelectedCategory(null);
    setIsMenuOpen(false);
  };

  const goToDetails = (movie) => {
    setSelectedMovie(movie);
    setCurrentView('details');
    window.scrollTo(0, 0);
  };

  const goToCategory = (catName) => {
    let coreName = catName.split(" ")[0]; 
    if(catName.includes("Web Series")) coreName = "Web Series";
    if(catName.includes("TV Shows")) coreName = "TV Shows";
    setSelectedCategory(coreName);
    setCurrentView('category');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false);
  };

  // Inline List View Component (or you can separate it to pages/MovieList.jsx)
  const ListView = ({ title, items }) => (
    <div className="container" style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}>
      <button onClick={goToHome} className="btn" style={{ color: '#9ca3af', marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Home
      </button>
      <SectionHeader title={title} icon={Folder} />
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem', color: '#6b7280', backgroundColor: '#1f2937', borderRadius: '4px', border: '1px solid #374151' }}>
          No movies found.
        </div>
      ) : (
        <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}>
           {items.map(movie => (
             <div key={movie.id} style={{ padding: '0.5rem', borderBottom: '1px solid #374151' }}>
               <MovieCard movie={movie} onClick={goToDetails} />
             </div>
           ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#e5e7eb' }}>
      <Header 
        user={user}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        goToHome={goToHome}
        goToCategory={goToCategory}
        handleLogout={handleLogout}
        setAuthMode={setAuthMode}
        setShowAuthModal={setShowAuthModal}
        categories={CATEGORIES}
      />
      
      {showAuthModal && (
        <AuthModal 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          setShowAuthModal={setShowAuthModal} 
          setUser={setUser} 
        />
      )}

      <main>
        {currentView === 'home' && (
          <Home 
            movies={MOCK_DB} 
            categories={CATEGORIES} 
            onMovieClick={goToDetails} 
            onCategoryClick={goToCategory} 
          />
        )}
        {currentView === 'details' && selectedMovie && (
          <MovieDetails movie={selectedMovie} onBack={goToHome} />
        )}
        {currentView === 'search' && (
          <ListView title={`Search Results: "${searchQuery}"`} items={getFilteredMovies()} />
        )}
        {currentView === 'category' && (
          <ListView title={`Category: ${selectedCategory}`} items={getFilteredMovies()} />
        )}
      </main>

      <Footer />
    </div>
  );
}
