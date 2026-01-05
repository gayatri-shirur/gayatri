import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../store/themeSlice';
import personalInfo from '../data/personalInfo.json';
import Timeline from '../components/Timeline';
import './About.css';

const About = () => {
  const theme = useSelector(selectTheme);

  // Prepare timeline items from personalInfo
  const timelineItems = [
    // Professional History
    ...personalInfo.professionalHistory.map(job => ({
      type: 'work',
      icon: '💼',
      title: job.role,
      Instuate:job.Instuate,
      location: job.location,
      startYear: job.startYear,
      endYear: job.endYear,
      current: job.current || false,
    })),
    // Education
    ...personalInfo.education.map(edu => ({
      type: 'education',
      icon: '🎓',
      title: edu.degree,
      institution: edu.institution,
      location: edu.location,
      startYear: edu.startYear,
      endYear: edu.endYear,
      current: false,
    })),
  ];

  return (
    <section 
      id="about" 
      className={`about-section ${theme.glassEffect ? 'glass-theme' : ''}`}
      style={{ 
        color: theme.textColor,
      }}
    >
      <div className="container">
        <h2 className="section-title" style={{ color: theme.primaryColor }}>
          About Me
        </h2>
        <div 
          className={`about-card ${theme.glassEffect ? 'glass-card' : ''}`}
          style={{
            backgroundColor: theme.glassEffect ? 'transparent' : theme.cardBackground,
            borderColor: theme.borderColor,
            boxShadow: `0 10px 30px ${theme.shadowColor}`,
          }}
        >
          <div className="about-main-content">
            <div className="about-content">
              <div className="about-image">
                <div 
                  className="avatar-placeholder"
                  style={{ 
                    border: `3px solid ${theme.primaryColor}`,
                    background: theme.glassEffect 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : theme.cardBackground,
                  }}
                >
                  {personalInfo.avatar}
                </div>
              </div>
              <div className="about-text">
                <h3 style={{ color: theme.primaryColor }}>Hello, I'm {personalInfo.name}</h3>
                <p style={{ color: theme.textColor }}>
                  {personalInfo.description}
                </p>
                <div className="skills">
                  {personalInfo.skills.slice(0, 4).map((skill, index) => (
                    <span 
                      key={index}
                      className="skill-tag"
                      style={{ 
                        backgroundColor: theme.glassEffect 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : theme.primaryColor,
                        color: theme.glassEffect ? theme.textColor : '#fff',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <Timeline items={timelineItems} theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
