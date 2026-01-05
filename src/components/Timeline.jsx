import React from 'react';
import './Timeline.css';

const Timeline = ({ items, theme }) => {
  console.log('==> Timeline items:', items);
  return (
    <div className="timeline-container">
      <h3 className="timeline-heading" style={{ color: theme.primaryColor }}>
        My Journey
      </h3>
      <div className="timeline">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`timeline-item ${item.type}`}
            style={{
              borderLeftColor: item.current ? theme.primaryColor : 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div 
              className="timeline-icon"
              style={{
                backgroundColor: item.current ? theme.primaryColor : theme.cardBackground,
                border: `2px solid ${item.current ? theme.primaryColor : 'rgba(255, 255, 255, 0.3)'}`,
              }}
            >
              {item.icon}
            </div>
            
            <div className="timeline-content">
              <div className="timeline-header">

                {(item.startYear) && (item.endYear) && (
                <span className="timeline-date" style={{ color: theme.primaryColor }}>
                  {item.startYear} - {item.endYear}
                </span>
                )}

                

              </div>
              <h4 className="timeline-title" style={{ color: theme.textColor }}>
                {item.Instuate}
              </h4>
              <h4 className="timeline-title" style={{ color: theme.textColor }}>
                {item.title}
              </h4>
              <div className="timeline-info" style={{ color: theme.textColor, opacity: 0.8 }}>
                <span>{item.institution || item.company}</span>
                {item.location && (
                  <>
                    <span className="timeline-separator"> • </span>
                    <span>📍 {item.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
