import React, { useEffect } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose, theme }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content ${theme.glassEffect ? 'glass-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.glassEffect ? 'rgba(255, 255, 255, 0.1)' : theme.cardBackground,
          color: theme.textColor,
          borderColor: theme.borderColor,
        }}
      >
        <button 
          className="modal-close"
          onClick={onClose}
          style={{ color: theme.textColor }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="modal-header">
          <span className="modal-icon">{project.icon}</span>
          <h2 style={{ color: theme.primaryColor }}>{project.title}</h2>
        </div>

        <div className="modal-image">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>

        <div className="modal-body">
          <p>{project.description}</p>

          <div className="modal-section">
            <h3 style={{ color: theme.primaryColor }}>Technologies</h3>
            <div className="modal-tech-tags">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="modal-tech-tag"
                  style={{
                    backgroundColor: theme.glassEffect 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : theme.borderColor,
                    color: theme.textColor,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3 style={{ color: theme.primaryColor }}>Design Documents</h3>
            <div className="modal-doc-links">
              <a 
                href={project.documents.hld}
                className="modal-doc-link"
                style={{
                  backgroundColor: theme.glassEffect 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : theme.primaryColor,
                  color: theme.glassEffect ? theme.textColor : '#fff',
                }}
              >
                📄 High Level Design
              </a>
              <a 
                href={project.documents.lld}
                className="modal-doc-link"
                style={{
                  backgroundColor: theme.glassEffect 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : theme.primaryColor,
                  color: theme.glassEffect ? theme.textColor : '#fff',
                }}
              >
                📋 Low Level Design
              </a>
            </div>
          </div>

          <div className="modal-section">
            <h3 style={{ color: theme.primaryColor }}>Screenshots</h3>
            <div className="modal-screenshots">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="modal-screenshot">
                  <img src={screenshot} alt={`Screenshot ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {project.link !== '#' && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-live-link"
              style={{
                backgroundColor: theme.glassEffect 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : theme.primaryColor,
                color: theme.glassEffect ? theme.textColor : '#fff',
              }}
            >
              🔗 View Live Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
