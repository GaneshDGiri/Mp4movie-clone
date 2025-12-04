import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock } from 'lucide-react';

const AuthModal = ({ authMode, setAuthMode, setShowAuthModal, setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (formData.email && formData.password) {
        setUser({ name: 'Demo User', email: formData.email });
        setShowAuthModal(false);
      } else {
        alert("Please fill in credentials");
      }
    } else {
      if (formData.name && formData.email && formData.mobile && formData.password) {
        setUser({ name: formData.name, email: formData.email, mobile: formData.mobile });
        setShowAuthModal(false);
      } else {
        alert("Please fill all fields");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={() => setShowAuthModal(false)} className="modal-close"><X size={24} /></button>
        <h2 className="modal-title">{authMode === 'login' ? 'Member Login' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="text-muted" />
                <input type="text" placeholder="Name" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">{authMode === 'login' ? 'Email or Mobile' : 'Email'}</label>
            <div className="input-wrapper">
              <Mail size={18} className="text-muted" />
              <input type={authMode === 'login' ? "text" : "email"} placeholder="Email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          {authMode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Mobile</label>
              <div className="input-wrapper">
                <Phone size={18} className="text-muted" />
                <input type="tel" placeholder="Mobile" className="form-input" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="text-muted" />
              <input type="password" placeholder="Password" className="form-input" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            {authMode === 'login' ? 'Login Now' : 'Register Now'}
          </button>
        </form>

        <div className="auth-footer">
          {authMode === 'login' ? (
            <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="link-btn">Register Here</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setAuthMode('login')} className="link-btn">Login Here</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;