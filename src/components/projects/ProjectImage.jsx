import React from 'react';

const ProjectImage = ({ project, activeImage, onThumbnailClick, theme }) => {
  return (
    <div className="project-image-section">
      <div className="project-main-image-container">
        <img 
          src={project.screenshots && project.screenshots.length > 0 
            ? project.screenshots[activeImage || 0]
            : project.image
          } 
          alt={`${project.title} screenshot ${(activeImage || 0) + 1}`}
          loading="lazy"
          className="project-display-image"
        />
        {project.icon &&
        <div className="project-icon-overlay">
          <span className="project-icon-large">{project.icon}</span>
        </div>}
      </div>

      {/* Thumbnail Gallery */}
      {project.screenshots && project.screenshots.length > 1 && (
        <div className="project-thumbnails-container">
          {project.screenshots.map((screenshot, index) => (
            <div
              key={index}
              className={`project-thumbnail ${activeImage === index ? 'active' : ''}`}
              onClick={() => onThumbnailClick(project.id, index)}
              style={{
                borderColor: activeImage === index ? theme.primaryColor : 'transparent',
              }}
            >
              <img 
                src={screenshot} 
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ProjectImage);
