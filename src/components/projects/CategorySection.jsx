import React from 'react';
import ProjectCard from './ProjectCard';

const CategorySection = ({ 
  category, 
  categoryIndex, 
  activeImages, 
  onThumbnailClick, 
  onOpenDetails, 
  theme 
}) => {
  return (
    <div 
      key={categoryIndex} 
      className="project-category-section"
      id={`category-${category.type}`}
    >
      {/* Category Title */}
      <h3 
        className="category-title"
        style={{ 
          color: theme.primaryColor,
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          paddingLeft: '2rem'
        }}
      >
        {category.title}
      </h3>
      
      {/* Projects in this category */}
      {category.projects.map((project) => (
        <ProjectCard 
          key={project.id}
          project={project}
          activeImage={activeImages[project.id]}
          onThumbnailClick={onThumbnailClick}
          onOpenDetails={onOpenDetails}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default React.memo(CategorySection);
