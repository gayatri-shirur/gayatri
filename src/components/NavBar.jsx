import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, selectCurrentTheme, toggleTheme as toggleThemeAction } from '../store/themeSlice';
import {
  selectSidebarVisible,
  selectSidebarPinned,
  showSidebar,
  hideSidebar,
  toggleSidebar,
} from '../store/sidebarSlice';
import personalInfo from '../data/personalInfo.json';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  
  const theme = useSelector(selectTheme);
  const currentTheme = useSelector(selectCurrentTheme);
  const sidebarVisible = useSelector(selectSidebarVisible);
  const isPinned = useSelector(selectSidebarPinned);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Check for category sections within projects
      const categories = [
        { id: 'category-webapp', section: 'webapp' },
        { id: 'category-mobileapp', section: 'mobileapp' },
        { id: 'category-other', section: 'other' }
      ];

      let foundCategory = false;
      for (const category of categories) {
        const element = document.getElementById(category.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(category.section);
            foundCategory = true;
            break;
          }
        }
      }

      // If no category found, check main sections
      if (!foundCategory) {
        const sections = ['about', 'projects', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              // If in projects section but no specific category, default to webapp
              if (section === 'projects') {
                setActiveSection('webapp');
              } else {
                setActiveSection(section);
              }
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body margin based on sidebar pinned state
  useEffect(() => {
    const appElement = document.querySelector('.App');
    if (appElement) {
      if (isPinned && sidebarVisible) {
        appElement.classList.add('sidebar-pinned');
      } else {
        appElement.classList.remove('sidebar-pinned');
      }
    }
    
    return () => {
      const appElement = document.querySelector('.App');
      if (appElement) {
        appElement.classList.remove('sidebar-pinned');
      }
    };
  }, [isPinned, sidebarVisible]);

  const handleSidebarMouseEnter = () => {
    if (!isPinned) {
      dispatch(showSidebar());
    }
  };

  const handleSidebarMouseLeave = () => {
    if (!isPinned) {
      dispatch(hideSidebar());
    }
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const navigateToCategory = (categoryTitle) => {
    // First scroll to projects section
    const projectsElement = document.getElementById('projects');
    if (projectsElement) {
      projectsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Wait for scroll, then find and scroll to specific category
    setTimeout(() => {
      const categoryHeadings = document.querySelectorAll('.category-title');
      for (const heading of categoryHeadings) {
        if (heading.textContent === categoryTitle) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Set active section based on the category
          if (categoryTitle === 'Web Applications') {
            setActiveSection('webapp');
          } else if (categoryTitle === 'Mobile Applications') {
            setActiveSection('mobileapp');
          } else if (categoryTitle === 'Other Cool Projects') {
            setActiveSection('other');
          }
          break;
        }
      }
    }, 500);
    setMenuOpen(false);
  };

  const getThemeIcon = (themeName) => {
    switch(themeName) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'liquidGlass': return '✨';
      default: return '☀️';
    }
  };

  const cycleTheme = () => {
    const themeOrder = ['light', 'dark', 'liquidGlass'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    dispatch(toggleThemeAction(themeOrder[nextIndex]));
  };

  return (
    <>
      {/* Vertical Sidebar - Always visible with icons */}
      <nav
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        className={`sidebar-nav ${theme.glassEffect ? 'glass-effect' : ''}`}
        style={{
          backgroundColor: theme.glassEffect 
            ? 'rgba(15, 23, 42, 0.85)' 
            : theme.navBackground || 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          color: theme.textColor,
          width: sidebarVisible ? '280px' : '80px',
          borderRight: `1px solid ${theme.borderColor}`,
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 0',
          boxShadow: sidebarVisible 
            ? '4px 0 30px rgba(0, 0, 0, 0.3)' 
            : '2px 0 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Logo/Name */}
        <div 
          style={{ 
            color: theme.primaryColor,
            fontSize: '1.5rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '0 1rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {sidebarVisible ? personalInfo.name : personalInfo.name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* Navigation Links */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 0.75rem' }}>
          <button
            onClick={() => navigateToSection('about')}
            className={`sidebar-link ${activeSection === 'about' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarVisible ? '1rem' : '0',
              padding: sidebarVisible ? '1rem 1.5rem' : '1rem 0',
              background: activeSection === 'about' 
                ? `linear-gradient(90deg, ${theme.primaryColor}20 0%, transparent 100%)`
                : 'transparent',
              border: 'none',
              borderLeft: activeSection === 'about' ? `4px solid ${theme.primaryColor}` : '4px solid transparent',
              borderRadius: '0 12px 12px 0',
              color: activeSection === 'about' ? theme.primaryColor : theme.textColor,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeSection === 'about' ? 600 : 500,
              textAlign: 'left',
              transition: 'all 0.3s ease',
              justifyContent: sidebarVisible ? 'flex-start' : 'center',
              position: 'relative',
              width: '100%',
            }}
            title={!sidebarVisible ? 'About' : ''}
            onMouseEnter={(e) => {
              if (activeSection !== 'about') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'about') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem', minWidth: '1.5rem', textAlign: 'center' }}>👤</span>
            {sidebarVisible && <span>About</span>}
          </button>

          {/* Web Apps */}
          <button
            onClick={() => navigateToCategory('Web Applications')}
            className={`sidebar-link ${activeSection === 'webapp' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarVisible ? '1rem' : '0',
              padding: sidebarVisible ? '1rem 1.5rem' : '1rem 0',
              background: activeSection === 'webapp' 
                ? `linear-gradient(90deg, ${theme.primaryColor}20 0%, transparent 100%)`
                : 'transparent',
              border: 'none',
              borderLeft: activeSection === 'webapp' ? `4px solid ${theme.primaryColor}` : '4px solid transparent',
              borderRadius: '0 12px 12px 0',
              color: activeSection === 'webapp' ? theme.primaryColor : theme.textColor,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeSection === 'webapp' ? 600 : 500,
              textAlign: 'left',
              transition: 'all 0.3s ease',
              justifyContent: sidebarVisible ? 'flex-start' : 'center',
              position: 'relative',
              width: '100%',
            }}
            title={!sidebarVisible ? 'Web Apps' : ''}
            onMouseEnter={(e) => {
              if (activeSection !== 'webapp') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'webapp') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem', minWidth: '1.5rem', textAlign: 'center' }}>💻</span>
            {sidebarVisible && <span>Web Apps</span>}
          </button>

          {/* Mobile Apps */}
          <button
            onClick={() => navigateToCategory('Mobile Applications')}
            className={`sidebar-link ${activeSection === 'mobileapp' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarVisible ? '1rem' : '0',
              padding: sidebarVisible ? '1rem 1.5rem' : '1rem 0',
              background: activeSection === 'mobileapp' 
                ? `linear-gradient(90deg, ${theme.primaryColor}20 0%, transparent 100%)`
                : 'transparent',
              border: 'none',
              borderLeft: activeSection === 'mobileapp' ? `4px solid ${theme.primaryColor}` : '4px solid transparent',
              borderRadius: '0 12px 12px 0',
              color: activeSection === 'mobileapp' ? theme.primaryColor : theme.textColor,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeSection === 'mobileapp' ? 600 : 500,
              textAlign: 'left',
              transition: 'all 0.3s ease',
              justifyContent: sidebarVisible ? 'flex-start' : 'center',
              position: 'relative',
              width: '100%',
            }}
            title={!sidebarVisible ? 'Mobile Apps' : ''}
            onMouseEnter={(e) => {
              if (activeSection !== 'mobileapp') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'mobileapp') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem', minWidth: '1.5rem', textAlign: 'center', display: 'flex', gap: '2px', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>🤖</span>
              <span style={{ fontSize: '1.2rem' }}>🍎</span>
            </span>
            {sidebarVisible && <span>Mobile Apps</span>}
          </button>

          {/* Other Cool Projects */}
          <button
            onClick={() => navigateToCategory('Other Cool Projects')}
            className={`sidebar-link ${activeSection === 'other' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarVisible ? '1rem' : '0',
              padding: sidebarVisible ? '1rem 1.5rem' : '1rem 0',
              background: activeSection === 'other' 
                ? `linear-gradient(90deg, ${theme.primaryColor}20 0%, transparent 100%)`
                : 'transparent',
              border: 'none',
              borderLeft: activeSection === 'other' ? `4px solid ${theme.primaryColor}` : '4px solid transparent',
              borderRadius: '0 12px 12px 0',
              color: activeSection === 'other' ? theme.primaryColor : theme.textColor,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeSection === 'other' ? 600 : 500,
              textAlign: 'left',
              transition: 'all 0.3s ease',
              justifyContent: sidebarVisible ? 'flex-start' : 'center',
              position: 'relative',
              width: '100%',
            }}
            title={!sidebarVisible ? 'Other Projects' : ''}
            onMouseEnter={(e) => {
              if (activeSection !== 'other') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'other') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem', minWidth: '1.5rem', textAlign: 'center' }}>🚀</span>
            {sidebarVisible && <span>Other Cool Projects</span>}
          </button>

          {/* Contact */}
          <button
            onClick={() => navigateToSection('contact')}
            className={`sidebar-link ${activeSection === 'contact' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarVisible ? '1rem' : '0',
              padding: sidebarVisible ? '1rem 1.5rem' : '1rem 0',
              background: activeSection === 'contact' 
                ? `linear-gradient(90deg, ${theme.primaryColor}20 0%, transparent 100%)`
                : 'transparent',
              border: 'none',
              borderLeft: activeSection === 'contact' ? `4px solid ${theme.primaryColor}` : '4px solid transparent',
              borderRadius: '0 12px 12px 0',
              color: activeSection === 'contact' ? theme.primaryColor : theme.textColor,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeSection === 'contact' ? 600 : 500,
              textAlign: 'left',
              transition: 'all 0.3s ease',
              justifyContent: sidebarVisible ? 'flex-start' : 'center',
              position: 'relative',
              width: '100%',
            }}
            title={!sidebarVisible ? 'Contact' : ''}
            onMouseEnter={(e) => {
              if (activeSection !== 'contact') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'contact') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem', minWidth: '1.5rem', textAlign: 'center' }}>📧</span>
            {sidebarVisible && <span>Contact</span>}
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={cycleTheme}
          style={{
            margin: sidebarVisible ? '2rem 1.5rem 1rem' : '2rem 1rem 1rem',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: theme.glassEffect 
              ? 'rgba(255, 255, 255, 0.1)' 
              : theme.cardBackground,
            color: theme.primaryColor,
            border: `1px solid ${theme.borderColor}`,
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          title={`Current: ${currentTheme} - Click to change`}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          {getThemeIcon(currentTheme)}
        </button>

        {/* Sidebar Pin/Unpin Button - Always visible but changes based on state */}
        <button
          onClick={handleToggleSidebar}
          style={{
            margin: sidebarVisible ? '0.5rem 1.5rem 0' : '0.5rem 1rem 0',
            padding: sidebarVisible ? '0.75rem 1rem' : '0.75rem',
            borderRadius: '12px',
            backgroundColor: theme.glassEffect 
              ? 'rgba(255, 255, 255, 0.1)' 
              : theme.cardBackground,
            color: theme.textColor,
            border: `1px solid ${theme.borderColor}`,
            cursor: 'pointer',
            fontSize: sidebarVisible ? '0.9rem' : '1.2rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          title={sidebarVisible ? (isPinned ? 'Unpin Sidebar' : 'Pin Sidebar') : (isPinned ? 'Unpin' : 'Pin')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.glassEffect 
              ? 'rgba(255, 255, 255, 0.1)' 
              : theme.cardBackground;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span>{isPinned ? '📌' : '📍'}</span>
          {sidebarVisible && <span>{isPinned ? 'Unpin' : 'Pin Sidebar'}</span>}
        </button>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="mobile-hamburger"
        onClick={() => setMenuOpen(true)}
        style={{
          backgroundColor: theme.glassEffect 
            ? 'rgba(255, 255, 255, 0.1)' 
            : theme.cardBackground,
          color: theme.textColor,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div 
            className={`mobile-menu ${theme.glassEffect ? 'glass-effect' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: theme.glassEffect ? 'transparent' : theme.navBackground,
              color: theme.textColor,
            }}
          >
            <button
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
              style={{ color: theme.textColor }}
            >
              ✕
            </button>

            <div className="mobile-menu-links">
              <button
                onClick={() => navigateToSection('about')}
                className={`mobile-link ${activeSection === 'about' ? 'active' : ''}`}
                style={{ color: theme.textColor }}
              >
                <span>👤</span>
                <span>About</span>
              </button>

              <button
                onClick={() => navigateToSection('projects')}
                className={`mobile-link ${activeSection === 'projects' ? 'active' : ''}`}
                style={{ color: theme.textColor }}
              >
                <span>💼</span>
                <span>Projects</span>
              </button>

              <button
                onClick={() => navigateToSection('contact')}
                className={`mobile-link ${activeSection === 'contact' ? 'active' : ''}`}
                style={{ color: theme.textColor }}
              >
                <span>📧</span>
                <span>Contact</span>
              </button>
            </div>

            <button
              className="mobile-theme-toggle"
              onClick={cycleTheme}
              style={{ color: theme.primaryColor }}
            >
              {getThemeIcon(currentTheme)} Switch Theme
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
