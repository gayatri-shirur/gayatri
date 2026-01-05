import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/themeSlice';
import './Projects.css';
import webAppsData from '../../data/projects/webapps.json';
import ProjectModal from '../../components/ProjectModal.jsx';
import CategorySection from '../../components/projects/CategorySection.jsx';

const Projects = () => {
  const theme = useSelector(selectTheme);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImages, setActiveImages] = useState({});
  const autoScrollIntervals = useRef({});

  // Combine all project categories
  const projectCategories = useMemo(() => [
    webAppsData
  ], []);

  // Get all projects for initialization
  const allProjects = useMemo(() => {
    return projectCategories.flatMap(category => category.projects);
  }, [projectCategories]);

  // Initialize active image index for each project
  useEffect(() => {
    const initialImages = {};
    allProjects.forEach(project => {
      initialImages[project.id] = 0;
    });
    setActiveImages(initialImages);
  }, [allProjects]);

  // Auto-scroll through images
  useEffect(() => {
    const intervals = {};
    
    allProjects.forEach((project) => {
      if (project.screenshots && project.screenshots.length > 1) {
        const intervalId = setInterval(() => {
          setActiveImages(prev => ({
            ...prev,
            [project.id]: (prev[project.id] + 1) % project.screenshots.length
          }));
        }, 2500); // Change image every 2.5 seconds
        
        intervals[project.id] = intervalId;
        autoScrollIntervals.current[project.id] = intervalId;
      }
    });

    // Cleanup intervals on unmount
    return () => {
      Object.values(intervals).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, [allProjects]);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((projectId, index) => {
    // Pause auto-scroll
    if (autoScrollIntervals.current[projectId]) {
      clearInterval(autoScrollIntervals.current[projectId]);
    }
    
    // Set active image
    setActiveImages(prev => ({
      ...prev,
      [projectId]: index
    }));
    
    // Resume auto-scroll after 5 seconds
    setTimeout(() => {
      const project = allProjects.find(p => p.id === projectId);
      if (project && project.screenshots) {
        const intervalId = setInterval(() => {
          setActiveImages(prev => ({
            ...prev,
            [projectId]: (prev[projectId] + 1) % project.screenshots.length
          }));
        }, 2500);
        autoScrollIntervals.current[projectId] = intervalId;
      }
    }, 5000);
  }, [allProjects]);

  const openProjectDetails = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section 
      id="projects" 
      className={`projects-section-new ${theme.glassEffect ? 'glass-theme' : ''}`}
      style={{ color: theme.textColor }}
    >
      <div className="container-full">
        <h2 className="section-title-new" style={{ color: theme.primaryColor }}>
          Projects
        </h2>
        
        <div className="projects-carousel-container">
          {projectCategories.map((category, categoryIndex) => (
            <CategorySection 
              key={categoryIndex}
              category={category}
              categoryIndex={categoryIndex}
              activeImages={activeImages}
              onThumbnailClick={handleThumbnailClick}
              onOpenDetails={openProjectDetails}
              theme={theme}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeModal}
          theme={theme}
        />
      )}
    </section>
  );
};

export default React.memo(Projects);
