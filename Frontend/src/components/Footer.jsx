import React from 'react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';

const Header = ({ 
  user, 
  isMenuOpen, 
  setIsMenuOpen, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  goToHome, 
  goToCategory, 
  handleLogout, 
  setAuthMode, 
  setShowAuthModal,
  categories 
}) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-container">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn mobile-menu-btn">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div onClick={goToHome} className="logo-text">
            <h1 className="logo-title">MP4<span>MOVIEZ</span></h1>
            <span className="logo-subtitle">Free Mobile Movies</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <button onClick={goToHome} className="btn nav-link">Home</button>
          <button onClick={() => goToCategory('Bollywood')} className="btn nav-link">Bollywood</button>
          <button onClick={() => goToCategory('Hollywood')} className="btn nav-link">Hollywood</button>
          <button onClick={() => goToCategory('Web Series')} className="btn nav-link">Web Series</button>
          
          <div style={{ width: '1px', height: '1rem', backgroundColor: '#374151' }}></div>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: '#fb923c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <User size={16} /> {user.name}
              </span>
              <button onClick={handleLogout} className="btn btn-icon" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="btn nav-link">Login</button>
              <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="btn btn-primary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Sign Up</button>
            </div>
          )}
        
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Search Movies..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" style={{ color: '#ea580c', background: 'none', border: 'none', cursor: 'pointer' }}><Search size={18} /></button>
          </form>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
           <nav className="flex flex-col">
              <div style={{ padding: '1rem', borderBottom: '1px solid #374151', marginBottom: '0.5rem' }}>
                {user ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fb923c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={18} /> {user.name}
                    </span>
                    <button onClick={handleLogout} className="btn" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button 
                      onClick={() => { setAuthMode('login'); setShowAuthModal(true); setIsMenuOpen(false); }} 
                      className="btn" 
                      style={{ backgroundColor: '#374151', justifyContent: 'center', borderRadius: '4px', padding: '0.5rem' }}
                    >Login</button>
                    <button 
                      onClick={() => { setAuthMode('signup'); setShowAuthModal(true); setIsMenuOpen(false); }} 
                      className="btn btn-primary" 
                      style={{ justifyContent: 'center' }}
                    >Sign Up</button>
                  </div>
                )}
              </div>
              <button onClick={goToHome} className="btn mobile-link">Home</button>
              {categories.map((cat, idx) => (
                <button key={idx} onClick={() => goToCategory(cat.name)} className="btn mobile-link">
                  {cat.name}
                </button>
              ))}
           </nav>
        </div>
      )}

      {/* Mobile Search */}
      <div className="mobile-search">
        <form onSubmit={handleSearch} className="mobile-search-form">
          <input 
            type="text" 
            placeholder="Search for movies..." 
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ color: '#ea580c', background: 'none', border: 'none' }}><Search size={20} /></button>
        </form>
      </div>
    </header>
  );
};

export default Header;