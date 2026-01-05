import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../store/themeSlice';
import './Contact.css';

const Contact = () => {
  const theme = useSelector(selectTheme);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: '💼', name: 'Gayatri\'s LinkedIn', url: 'https://www.linkedin.com/in/gayatri-shirur-38b23a231/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { icon: '🐙', name: 'GitHub', url: 'https://github.com/gayatri-shirur' },
  ];

  return (
    <section 
      id="contact" 
      className={`contact-section ${theme.glassEffect ? 'glass-theme' : ''}`}
      style={{ 
        color: theme.textColor,
      }}
    >
      <div className="container">
        <h2 className="section-title" style={{ color: theme.primaryColor }}>
          Contact Me
        </h2>
        
        <div className="contact-content">
          <div 
            className={`contact-info ${theme.glassEffect ? 'glass-card' : ''}`}
            style={{
              backgroundColor: theme.glassEffect ? 'transparent' : theme.cardBackground,
              borderColor: theme.borderColor,
              boxShadow: `0 10px 30px ${theme.shadowColor}`,
            }}
          >
            <h3 style={{ color: theme.primaryColor }}>Let's Connect</h3>
            <p style={{ color: theme.textColor }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={`social-link ${theme.glassEffect ? 'glass-effect' : ''}`}
                  style={{
                    backgroundColor: theme.glassEffect 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : theme.borderColor,
                    color: theme.textColor,
                    border: `1px solid ${theme.borderColor}`,
                  }}
                  title={link.name}
                >
                  <span className="social-icon">{link.icon}</span>
                  <span className="social-name">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          
        </div>
      </div>

      <footer 
        className="footer"
        style={{ 
          color: theme.secondaryColor,
          borderTop: `1px solid ${theme.borderColor}`,
        }}
      >
        <p>Gayatri</p>
      </footer>
    </section>
  );
};

export default Contact;
