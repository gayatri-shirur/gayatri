import React from 'react';

const ProjectContent = ({ project, theme, onOpenDetails }) => {
  return (
    <div className="project-content">
      <h3 style={{ color: theme.primaryColor }}>{project.title}</h3>
      <p style={{ color: theme.textColor }}>{project.description}</p>
      
      <div className="tech-tags-new">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="tech-tag-new"
            style={{
              backgroundColor: theme.glassEffect ? 'rgba(255, 255, 255, 0.15)' : theme.borderColor,
              color: theme.textColor,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="document-links">
        
        <button
          className="view-details-btn"
          onClick={() => {
            if (project.projectUrl) {
              window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
            } else {
              onOpenDetails(project);
            }
          }}
          style={{
            backgroundColor: theme.glassEffect ? 'rgba(255, 255, 255, 0.2)' : theme.primaryColor,
            color: theme.glassEffect ? theme.textColor : '#fff',
          }}
        >
          {project.btnText || 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProjectContent);
