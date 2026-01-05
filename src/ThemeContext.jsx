import React, { createContext, useState, useContext, useEffect } from 'react';
import flavors, { getFlavor, getAvailableFlavors } from './flavors.js';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const availableThemes = getAvailableFlavors();
    if (savedTheme && availableThemes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const toggleTheme = (themeName) => {
    const availableThemes = getAvailableFlavors();
    if (availableThemes.includes(themeName)) {
      setCurrentTheme(themeName);
      localStorage.setItem('theme', themeName);
    }
  };

  const theme = getFlavor(currentTheme);

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme, flavors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
