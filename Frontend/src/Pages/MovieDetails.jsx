//src/pages/MovieDetails.jsx

import React from 'react';
import { ArrowLeft, Star, Download, Film } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const MovieDetails = ({ movie, onBack }) => {

  // Function to handle the download logic
  const handleDownload = (fileName, fileSize) => {
    // -------------------------------------------------------------------------
    // REAL WORLD LOGIC:
    // In a real app, you would use the actual URL from your database:
    // window.location.href = fileLink; 
    // OR
    // const link = document.createElement('a');
    // link.href = "https://myserver.com/movies/pathaan.mp4";
    // link.setAttribute('download', fileName);
    // -------------------------------------------------------------------------

    // DEMO LOGIC (To make it work right now without a server):
    // We create a "fake" file blob so you can see the file landing in your Downloads folder.
    const fakeContent = `This is a placeholder video file for: ${fileName}\nSize: ${fileSize}\n\nIn a fully hosted application, this would be the actual .mp4 or .mkv file stream.`;
    
    // Create a Blob (Binary Large Object) pretending to be a video
    const blob = new Blob([fakeContent], { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    
    // Ensure the file has the correct extension
    const downloadName = fileName.endsWith('.mp4') || fileName.endsWith('.mkv') 
      ? fileName 
      : `${fileName}.mp4`;
      
    link.setAttribute('download', downloadName); // This forces the name
    document.body.appendChild(link);
    
    // Trigger the click
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Optional: Show a message
    alert(`Your download for "${downloadName}" has started!`);
  };

  return (
    <div className="container" style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}>
      <button onClick={onBack} className="btn" style={{ color: '#9ca3af', marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="details-card">
        <h1 className="details-header">{movie.title} ({movie.year}) {movie.language} Download</h1>
        <div className="details-content">
          <div style={{ flexShrink: 0 }}>
            <img src={movie.poster} alt={movie.title} className="details-poster" />
          </div>
          <div style={{ flexGrow: 1, fontSize: '0.875rem', color: '#d1d5db' }}>
             <div className="info-row"><span className="info-label">IMDb Rating</span><span style={{ display: 'flex', alignItems: 'center', color: '#eab308' }}><Star size={14} style={{ marginRight: '0.25rem', fill: 'currentColor' }}/> {movie.rating}/10</span></div>
             <div className="info-row"><span className="info-label">Genre</span><span>{movie.genre}</span></div>
             <div className="info-row"><span className="info-label">Duration</span><span>2h 15m (Approx)</span></div>
             <div className="info-row"><span className="info-label">Language</span><span>{movie.language}</span></div>
             <div className="info-row"><span className="info-label">Quality</span><span style={{ color: '#4ade80', fontWeight: 'bold' }}>{movie.quality}</span></div>
             <div style={{ paddingTop: '1rem' }}><h3 style={{ fontWeight: 'bold', color: '#9ca3af', marginBottom: '0.25rem' }}>Synopsis:</h3><p style={{ color: '#9ca3af', lineHeight: '1.6', fontSize: '0.875rem' }}>{movie.description}</p></div>
          </div>
        </div>
      </div>

      <SectionHeader title="Download Links" icon={Download} />
      <div className="download-list">
        <div className="alert-box">⚠ Click the link below and wait 10 seconds for the download to start.</div>
        
        {movie.files.map((file, idx) => (
          <div key={idx} className="download-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1 }}>
              <div style={{ backgroundColor: 'rgba(234, 88, 12, 0.2)', padding: '0.5rem', borderRadius: '4px', color: '#ea580c' }}><Film size={20} /></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#e5e7eb', wordBreak: 'break-all' }}>{file.name}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Size: {file.size}</span>
              </div>
            </div>
            {/* Updated Button with onClick handler */}
            <button 
              className="btn btn-primary" 
              style={{ justifyContent: 'center' }}
              onClick={() => handleDownload(file.name, file.size)}
            >
              <Download size={16} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;