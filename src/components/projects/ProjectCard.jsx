import React from 'react';
import ProjectImage from './ProjectImage';
import ProjectContent from './ProjectContent';

const ProjectCard = ({ 
  project, 
  activeImage, 
  onThumbnailClick, 
  onOpenDetails, 
  theme 
}) => {
  return (
    <div key={project.id} className="project-row">
      <div 
        className={`project-main-card ${theme.glassEffect ? 'glass-card' : ''}`}
        style={{
          backgroundColor: theme.glassEffect ? 'transparent' : theme.cardBackground,
          borderColor: theme.borderColor,
          boxShadow: `0 10px 40px ${theme.shadowColor}`,
        }}
      >
        <ProjectImage 
          project={project}
          activeImage={activeImage}
          onThumbnailClick={onThumbnailClick}
          theme={theme}
        />
        
        <ProjectContent 
          project={project}
          theme={theme}
          onOpenDetails={onOpenDetails}
        />
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
